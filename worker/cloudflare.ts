import handler from 'vinext/server/fetch-handler';
import {flushNotifications,telegramWebhook} from '../lib/telegram-notifications';
import {handleAuth} from '../lib/cloudflare-auth';

export default {
  async fetch(request:Request, env:Cloudflare.Env, ctx:ExecutionContext) {
    // Never let clients inject the identity headers trusted by the former host.
    const headers=new Headers(request.headers);
    for(const name of [...headers.keys()]) if(name.startsWith('oai-authenticated-user-')) headers.delete(name);
    const clean=new Request(request,{headers});
    if(new URL(clean.url).pathname==='/api/telegram/webhook')return telegramWebhook(clean,env);
    const auth=await handleAuth(clean,env);
    const response=auth ?? await handler.fetch(clean,env,ctx);
    if(clean.method==='POST'&&new URL(clean.url).pathname.endsWith('/guest')&&response.status===201)ctx.waitUntil(flushNotifications(env).catch(()=>{}));
    return response;
  },
  async scheduled(_event:ScheduledController,env:Cloudflare.Env,ctx:ExecutionContext){ctx.waitUntil(flushNotifications(env))}
};
