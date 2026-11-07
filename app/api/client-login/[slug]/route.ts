import {env} from 'cloudflare:workers';import {findPublicSite} from '../../../../lib/public-site';import {normalizedLogin,verifyPassword} from '../../../../lib/client-password';import {seal} from '../../../../lib/cloudflare-auth';import {readGuestText} from '../../../../lib/guest-validation';import {z} from 'zod';
const reply=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(req:Request,{params}:{params:Promise<{slug:string}>}){
 if(req.headers.get('origin')!==new URL(req.url).origin)return reply({error:'Откройте форму на сайте'},403);
 if(!env.SESSION_SECRET||!env.DB)return reply({error:'Вход пока недоступен'},503);
 let data;try{data=z.object({login:z.string().min(1).max(100),password:z.string().min(1).max(128)}).parse(JSON.parse(await readGuestText(req)))}catch{return reply({error:'Введите логин и пароль'},400)}
 try{const {slug}=await params;const site=await findPublicSite(slug);if(!site)return reply({error:'Неверный логин или пароль'},401);
 const window=Math.floor(Date.now()/900000);const hmac=await crypto.subtle.importKey('raw',new TextEncoder().encode(env.SESSION_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);const signed=await crypto.subtle.sign('HMAC',hmac,new TextEncoder().encode(site.id+'|'+(req.headers.get('cf-connecting-ip')||'unknown')+'|'+window));const key=Buffer.from(signed).toString('base64url');
 const counter=await env.DB.prepare('INSERT INTO client_login_attempts(key,attempts,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET attempts=attempts+1 RETURNING attempts').bind(key,(window+2)*900).first<{attempts:number}>();if(!counter||counter.attempts>10)return reply({error:'Много попыток входа. Повторите через 15 минут.'},429);
 const row=await env.DB.prepare('SELECT login,password_hash,revision,enabled FROM client_credentials WHERE project_id=?').bind(site.id).first<{login:string;password_hash:string;revision:number;enabled:number}>();
 if(!row?.enabled||row.login!==normalizedLogin(data.login)||!await verifyPassword(data.password,row.password_hash))return reply({error:'Неверный логин или пароль'},401);
 const session=await seal({purpose:'client-session',clientProjectId:site.id,revision:row.revision,exp:Math.floor(Date.now()/1000)+86400},env.SESSION_SECRET);
 const response=reply({ok:true,redirect:'/studio?project='+site.id});response.headers.append('Set-Cookie',`__Host-saayt-session=${session}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`);for(const name of ['saayt-client-site','saayt-workspace'])response.headers.append('Set-Cookie',`${name}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);return response;
 }catch{return reply({error:'Не удалось войти. Повторите позже.'},503)}
}
