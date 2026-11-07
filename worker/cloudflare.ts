import handler from 'vinext/server/fetch-handler';
import {handleAuth} from '../lib/cloudflare-auth';

export default {
  async fetch(request:Request, env:Cloudflare.Env, ctx:ExecutionContext) {
    // Never let clients inject the identity headers trusted by the former host.
    const headers=new Headers(request.headers);
    for(const name of [...headers.keys()]) if(name.startsWith('oai-authenticated-user-')) headers.delete(name);
    const clean=new Request(request,{headers});
    const auth=await handleAuth(clean,env);
    return auth ?? handler.fetch(clean,env,ctx);
  }
};
