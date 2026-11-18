import {access,phoneSession} from './access';
import { z } from 'zod';
import { readSession } from '../cloudflare-auth';
import { initialCatalog } from './seed';

const root = '/orbek';
const catalogKey = 'orbek/catalog.json';
const rateKey = 'orbek/cbu-usd.json';
const imagePattern = /^\/orbek\/(?:img\/[a-z-]+\.webp|photo\/[a-f0-9-]{36})$/;
const name = z.string().trim().min(1).max(180);
const item = z.object({
  id:z.string().regex(/^[a-zA-Z0-9_-]{1,100}$/),
  category:z.enum(['faucet','sink','shower','toilet','mirror','tub','vanity','accessories','pump','pipe','fitting','valve','filter','hose','trap']),
  photos:z.array(z.string().regex(imagePattern)).max(5).optional(),demo:z.boolean().optional(),price:z.number().int().nonnegative().max(1e12), image:z.string().regex(imagePattern),
  names:z.object({ru:name,uz:name,en:name,zh:name,hi:name})
});
const catalog = z.object({
  items:z.array(item).max(1000).refine(items=>new Set(items.map(x=>x.id)).size===items.length),
  contacts:z.object({channel:z.string().regex(/^(?:https:\/\/t\.me\/(?:[a-zA-Z0-9_]+|\+[a-zA-Z0-9_-]+))?$/).optional(),whatsapp:z.string().regex(/^(?:https:\/\/wa\.me\/[1-9][0-9]{6,14})?$/).optional(),telegram:z.string().regex(/^(?:https:\/\/t\.me\/[A-Za-z0-9_]+)?$/),phone:z.string().regex(/^(?:\+?[0-9 ()-]{5,30})?$/),map:z.union([z.literal(''),z.string().url().max(2000).startsWith('https://')])}),
  revision:z.string().max(150)
});
function reply(value:unknown,status=200){return Response.json(value,{status,headers:{'Cache-Control':'private, no-store'}})}
type Quote={rate:number,date:string,checked:number};
let recent:Quote|undefined;
async function quote(bucket:R2Bucket) {
  if(!recent) recent=await (await bucket.get(rateKey))?.json<Quote>();
  if(recent && Date.now()-recent.checked<3600000)return reply(recent);
  try {
    const res=await fetch('https://cbu.uz/ru/arkhiv-kursov-valyut/json/USD/',{signal:AbortSignal.timeout(5000)});
    if(!res.ok)throw Error();
    const [row]=await res.json() as {Ccy:string,Rate:string,Nominal:string,Date:string}[];
    const rate=Number(row.Rate)/Number(row.Nominal);
    if(row.Ccy!=='USD'||!Number.isFinite(rate)||rate<=0||!/^\d{2}\.\d{2}\.\d{4}$/.test(row.Date))throw Error();
    const fresh={rate,date:row.Date.split('.').reverse().join('-'),checked:Date.now()};
    await bucket.put(rateKey,JSON.stringify(fresh)); recent=fresh; return reply(fresh);
  }catch{
    // Last verified CBU publication, always carrying its effective date.
    return reply({...recent||{rate:12010.45,date:'2026-11-18'},stale:true});
  }
}
async function bounded(req:Request,max:number){
  if(Number(req.headers.get('content-length'))>max||!req.body)return null;
  const reader=req.body.getReader(),parts:Uint8Array[]=[];let total=0;
  for(;;){const {done,value}=await reader.read();if(done)break;total+=value.length;if(total>max){await reader.cancel();return null}parts.push(value)}
  const bytes=new Uint8Array(total);let offset=0;for(const p of parts){bytes.set(p,offset);offset+=p.length}return bytes;
}
export async function shopApi(req:Request,env:Cloudflare.Env) {
  const path=new URL(req.url).pathname.substring(root.length);
  const bucket=env.BUCKET;
  if(!bucket)return reply({error:'storage'},503);
  if(req.method==='GET'&&path==='/api/rate')return quote(bucket);
  if(req.method==='GET'&&/^\/photo\/[a-f0-9-]{36}$/.test(path)){
    const object=await bucket.get('orbek'+path);
    return object?new Response(object.body,{headers:{'Content-Type':object.httpMetadata?.contentType||'application/octet-stream','Cache-Control':'public,max-age=31536000,immutable','X-Content-Type-Options':'nosniff'}}):reply({},404);
  }
  const user=await readSession(req.headers,env);
  const owner=Boolean(user?.email && !user.clientProjectId && user.email.toLowerCase()===env.SALES_ADMIN_EMAIL?.toLowerCase());
  if(['/api/login','/api/logout','/api/set-password'].includes(path))return access(req,env,path,owner);
  const admin=owner||await phoneSession(req,env);
  if(path==='/api/catalog'&&req.method==='GET'){
    const obj=await bucket.get(catalogKey);
    const data=obj?await obj.json<typeof initialCatalog>():initialCatalog;
    return reply({...data,revision:obj?.etag||'initial',admin,owner});
  }
  if(!admin || req.headers.get('origin')!==new URL(req.url).origin)return reply({},403);
  if(path==='/api/catalog'&&req.method==='PUT'){
    const bytes=await bounded(req,1500000);if(!bytes)return reply({},413);
    let input;try{input=catalog.safeParse(JSON.parse(new TextDecoder().decode(bytes)))}catch{return reply({},400)}
    if(!input.success)return reply({},422);
    const {revision,...data}=input.data;
    const saved=await bucket.put(catalogKey,JSON.stringify(data),{onlyIf:revision==='initial'?{etagDoesNotMatch:'*'}:{etagMatches:revision}});
    return saved?reply({revision:saved.etag}):reply({},409);
  }
  if(path==='/api/image'&&req.method==='POST'){
    const bytes=await bounded(req,6*1024*1024);if(!bytes)return reply({},413);
    const head=new TextDecoder('latin1').decode(bytes.subarray(0,12));
    const mime=bytes[0]===255&&bytes[1]===216&&bytes[2]===255?'image/jpeg':bytes[0]===137&&head.slice(1,4)==='PNG'?'image/png':head.startsWith('RIFF')&&head.slice(8)==='WEBP'?'image/webp':null;
    if(!mime)return reply({},415);
    const url='/orbek/photo/'+crypto.randomUUID();await bucket.put(url.slice(1),bytes,{httpMetadata:{contentType:mime}});return reply({url},201);
  }
  return reply({},404);
}
