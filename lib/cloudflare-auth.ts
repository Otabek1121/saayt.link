export type SessionUser={userId:string;displayName:string;email:string;fullName:string|null};
const SESSION='__Host-saayt-session', FLOW='__Host-saayt-oauth';
const encoder=new TextEncoder();
const encode=(bytes:Uint8Array)=>Buffer.from(bytes).toString('base64url');
const decode=(value:string)=>new Uint8Array(Buffer.from(value,'base64url'));
export function safeReturnTo(value:string|null){
  if(!value?.startsWith('/')||value.startsWith('//'))return '/studio';
  const url=new URL(value,'https://local.test');
  return url.origin==='https://local.test'&&!/^\/(signin-with-chatgpt|signout-with-chatgpt|api\/auth)(\/|$)/.test(url.pathname)?url.pathname+url.search+url.hash:'/studio';
}
export function cookieValue(headers:Headers,name:string){
  const values=(headers.get('cookie')||'').split(';').map(x=>x.trim()).filter(x=>x.startsWith(name+'='));
  return values.length===1?values[0].slice(name.length+1):null;
}
async function key(secret:string){
  if(secret.length<32)throw Error('SESSION_SECRET must have at least 32 characters');
  return crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);
}
export async function seal(value:object,secret:string){
  const payload=encode(encoder.encode(JSON.stringify(value)));
  const signature=await crypto.subtle.sign('HMAC',await key(secret),encoder.encode(payload));
  return payload+'.'+encode(new Uint8Array(signature));
}
export async function unseal(value:string|null,secret:string):Promise<Record<string,unknown>|null>{
  if(!value||value.length>8192)return null;
  try{
    const [payload,signature,extra]=value.split('.');
    if(!payload||!signature||extra||!await crypto.subtle.verify('HMAC',await key(secret),decode(signature),encoder.encode(payload)))return null;
    const data=JSON.parse(new TextDecoder().decode(decode(payload)));
    return typeof data.exp==='number'&&data.exp>Date.now()/1000?data:null;
  }catch{return null}
}
export async function readSession(headers:Headers,env:Cloudflare.Env):Promise<SessionUser|null>{
  if(env.AUTH_PROVIDER!=='google'||!env.SESSION_SECRET)return null;
  const data=await unseal(cookieValue(headers,SESSION),env.SESSION_SECRET);
  if(data?.purpose!=='session'||typeof data.userId!=='string'||typeof data.email!=='string'||typeof data.displayName!=='string')return null;
  return {userId:data.userId,email:data.email,displayName:data.displayName,fullName:typeof data.fullName==='string'?data.fullName:null};
}
const cookie=(name:string,value:string,seconds:number)=>`${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${seconds}`;
function redirect(location:string,cookies:string[]=[]){const headers=new Headers({'Location':location,'Cache-Control':'no-store','Referrer-Policy':'no-referrer'});for(const c of cookies)headers.append('Set-Cookie',c);return new Response(null,{status:302,headers})}
function unavailable(){return new Response('Вход пока не настроен. Повторите позже.',{status:503,headers:{'Cache-Control':'no-store','Content-Type':'text/plain; charset=utf-8'}})}
export async function handleAuth(request:Request,env:Cloudflare.Env):Promise<Response|null>{
  const url=new URL(request.url), path=url.pathname;
  if(!['/signin-with-chatgpt','/signout-with-chatgpt','/api/auth/google/callback'].includes(path))return null;
  if(request.method!=='GET')return new Response(null,{status:405,headers:{Allow:'GET'}});
  if(env.AUTH_PROVIDER!=='google'||!env.SESSION_SECRET||env.SESSION_SECRET.length<32)return unavailable();
  if(path==='/signout-with-chatgpt')return redirect(safeReturnTo(url.searchParams.get('return_to')),[cookie(SESSION,'',0),cookie(FLOW,'',0),cookie('saayt-workspace','',0)]);
  if(!env.GOOGLE_CLIENT_ID||!env.GOOGLE_CLIENT_SECRET)return unavailable();
  const origin=env.PUBLIC_SITE_ORIGIN;
  if(!origin||new URL(origin).origin!==url.origin||url.protocol!=='https:')return unavailable();
  const callback=origin+'/api/auth/google/callback';
  if(path==='/signin-with-chatgpt'){
    const state=encode(crypto.getRandomValues(new Uint8Array(32))),verifier=encode(crypto.getRandomValues(new Uint8Array(32)));
    const challenge=encode(new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(verifier))));
    const flow=await seal({purpose:'oauth',state,verifier,returnTo:safeReturnTo(url.searchParams.get('return_to')),exp:Math.floor(Date.now()/1000)+600},env.SESSION_SECRET);
    const target=new URL('https://accounts.google.com/o/oauth2/v2/auth');
    target.search=new URLSearchParams({client_id:env.GOOGLE_CLIENT_ID,redirect_uri:callback,response_type:'code',scope:'openid email profile',state,code_challenge:challenge,code_challenge_method:'S256',prompt:'select_account'}).toString();
    return redirect(target.href,[cookie(FLOW,flow,600)]);
  }
  const clear=cookie(FLOW,'',0);
  try{
    const flow=await unseal(cookieValue(request.headers,FLOW),env.SESSION_SECRET);
    if(flow?.purpose!=='oauth'||flow.state!==url.searchParams.get('state')||typeof flow.verifier!=='string'||!url.searchParams.get('code')||url.searchParams.has('error'))throw Error('Invalid OAuth response');
    const tokenResponse=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:env.GOOGLE_CLIENT_ID,client_secret:env.GOOGLE_CLIENT_SECRET,code:url.searchParams.get('code')!,code_verifier:flow.verifier,grant_type:'authorization_code',redirect_uri:callback}),signal:AbortSignal.timeout(15000)});
    if(!tokenResponse.ok)throw Error('Token exchange failed');
    const token=await tokenResponse.json() as {access_token?:string;token_type?:string};
    if(!token.access_token||token.token_type?.toLowerCase()!=='bearer')throw Error('Missing token');
    // Identity is fetched from Google over HTTPS using the server-exchanged token.
    // No unverified JWT or client-supplied email is accepted.
    const profileResponse=await fetch('https://openidconnect.googleapis.com/v1/userinfo',{headers:{Authorization:'Bearer '+token.access_token},signal:AbortSignal.timeout(15000)});
    if(!profileResponse.ok)throw Error('Profile request failed');
    const profile=await profileResponse.json() as {sub?:string;email?:string;email_verified?:boolean;name?:string};
    if(!profile.sub||!profile.email||profile.email_verified!==true||!env.DB)throw Error('Unverified identity');
    const email=profile.email.toLowerCase();
    // Migrations explicitly bind a verified email to an old owner ID. Never infer ownership from public headers.
    const mapped=await env.DB.prepare('SELECT user_id FROM auth_legacy_identities WHERE email = ?').bind(email).first<{user_id:string}>();
    const user:SessionUser={userId:mapped?.user_id??'google:'+profile.sub,email,displayName:profile.name||email,fullName:profile.name||null};
    const session=await seal({...user,purpose:'session',exp:Math.floor(Date.now()/1000)+604800},env.SESSION_SECRET);
    return redirect(safeReturnTo(typeof flow.returnTo==='string'?flow.returnTo:null),[clear,cookie(SESSION,session,604800),cookie('saayt-workspace','',0)]);
  }catch{
    return new Response('Не удалось войти. Вернитесь на сайт и повторите вход.',{status:400,headers:{'Set-Cookie':clear,'Cache-Control':'no-store','Content-Type':'text/plain; charset=utf-8'}});
  }
}
