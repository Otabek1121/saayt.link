import {cookieValue,seal,unseal} from '../cloudflare-auth';
import {hashPassword,verifyPassword} from '../client-password';
import {readGuestText} from '../guest-validation';

const recordKey='orbek/private/admin-password';
const cookie='__Host-orbek-admin';
const phone='998915506700';
const response=(status:number)=>new Response(null,{status,headers:{'Cache-Control':'no-store'}});
export async function phoneSession(req:Request,env:Cloudflare.Env){
  const token=cookieValue(req.headers,cookie);
  if(!token||!env.SESSION_SECRET||!env.BUCKET)return false;
  const session=await unseal(token,env.SESSION_SECRET);
  if(session?.purpose!=='orbek-admin')return false;
  const record=await env.BUCKET.head(recordKey);
  return Boolean(record && record.etag===session.version);
}
export async function access(req:Request,env:Cloudflare.Env,path:string,owner:boolean){
  if(req.method!=='POST'||req.headers.get('origin')!==new URL(req.url).origin)return response(403);
  if(!env.SESSION_SECRET||!env.DB||!env.BUCKET)return response(503);
  if(path==='/api/logout'){
    const result=response(204);result.headers.set('Set-Cookie',cookie+'=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0');return result;
  }
  if(path==='/api/set-password'&&!owner)return response(403);
  let data;try{data=JSON.parse(await readGuestText(req))}catch{return response(400)}
  if(!data||typeof data.password!=='string'||data.password.length>128)return response(400);
  if(path==='/api/set-password'){
    if(data.password.length<12)return response(400);
    await env.BUCKET.put(recordKey,await hashPassword(data.password));return response(204);
  }
  const window=Math.floor(Date.now()/900000);
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(env.SESSION_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const digest=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode('orbek-login|'+window+'|'+(req.headers.get('cf-connecting-ip')||'unknown')));
  const counter=await env.DB.prepare('INSERT INTO client_login_attempts(key,attempts,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET attempts=attempts+1 RETURNING attempts').bind(Buffer.from(digest).toString('base64url'),(window+2)*900).first<{attempts:number}>();
  if(!counter||counter.attempts>10)return response(429);
  const record=await env.BUCKET.get(recordKey);
  if(!record||String(data.phone).replace(/[^0-9]/g,'')!==phone||data.password.length<12||!await verifyPassword(data.password,await record.text()))return response(401);
  const token=await seal({purpose:'orbek-admin',version:record.etag,exp:Math.floor(Date.now()/1000)+28800},env.SESSION_SECRET);
  const result=response(204);result.headers.set('Set-Cookie',cookie+'='+token+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=28800');return result;
}
