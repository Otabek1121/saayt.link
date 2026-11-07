import {backupTick} from '../lib/backup';
import handler from 'vinext/server/fetch-handler';
import {flushNotifications,telegramWebhook} from '../lib/telegram-notifications';
import {handleAuth} from '../lib/cloudflare-auth';

export default {
  async fetch(request:Request, env:Cloudflare.Env, ctx:ExecutionContext) {
    // Never let clients inject the identity headers trusted by the former host.
    const headers=new Headers(request.headers);
    for(const name of [...headers.keys()]) if(name.startsWith('oai-authenticated-user-')) headers.delete(name);
    const clean=new Request(request,{headers});
    const url=new URL(clean.url);
    if(env.PREVIOUS_SITE_ORIGIN&&url.origin===env.PREVIOUS_SITE_ORIGIN&&env.PUBLIC_SITE_ORIGIN&&['GET','HEAD'].includes(clean.method)&&(url.pathname==='/'||url.pathname==='/templates'||/^\/s\/[a-z0-9-]+$/.test(url.pathname))){const target=new URL(env.PUBLIC_SITE_ORIGIN);target.pathname=url.pathname;target.search=url.search;return Response.redirect(target.href,308)}

    if(new URL(clean.url).pathname==='/api/telegram/webhook')return telegramWebhook(clean,env);
    const auth=await handleAuth(clean,env);
    const response=auth ?? await handler.fetch(clean,env,ctx);if(response.status>=500)console.error(JSON.stringify({event:'http_failure',method:clean.method,path:new URL(clean.url).pathname,status:response.status}));
    if(clean.method==='POST'&&new URL(clean.url).pathname.endsWith('/guest')&&response.status===201)ctx.waitUntil(flushNotifications(env).catch(()=>{}));
    return response;
  },
  async scheduled(_event:ScheduledController,env:Cloudflare.Env,ctx:ExecutionContext){ctx.waitUntil(Promise.allSettled([flushNotifications(env),backupTick(env)]))}
};
