import {getChatGPTUser,chatGPTSignInPath} from '../../../chatgpt-auth';
import {getDb} from '../../../../db';
import {projects,projectClients,studioMembers} from '../../../../db/schema';
import {and,eq} from 'drizzle-orm';
import {CLIENT_SITE_COOKIE,normalizedEmail,workspaceCookie} from '../../../../lib/workspace';
export const dynamic='force-dynamic';
export async function GET(req:Request,{params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const url=new URL(req.url);const user=await getChatGPTUser();
 if(!user)return Response.redirect(new URL(chatGPTSignInPath('/s/'+encodeURIComponent(slug)+'/manage'),url),302);
 const [p]=await getDb().select().from(projects).where(and(eq(projects.publicSlug,slug),eq(projects.publicEnabled,1),eq(projects.archived,0)));
 if(!p?.published)return new Response('Сайт не найден',{status:404});
 const [team]=await getDb().select().from(studioMembers).where(and(eq(studioMembers.owner,p.owner),eq(studioMembers.userId,user.userId),eq(studioMembers.status,'active')));
 const ownerOrTeam=user.userId===p.owner||!!team;
 if(!ownerOrTeam){const [grant]=await getDb().select().from(projectClients).where(and(eq(projectClients.projectId,p.id),eq(projectClients.email,normalizedEmail(user.email))));
 if(!grant)return new Response('У этой почты нет доступа к редактированию сайта. Попросите создателя сайта добавить ваш Google email в разделе «Доступ клиента».',{status:403,headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'}})}
 const response=Response.redirect(new URL('/studio?project='+p.id,url),302);
 const result=new Response(response.body,response);
 result.headers.set('Cache-Control','no-store');
 result.headers.append('Set-Cookie',`${CLIENT_SITE_COOKIE}=${ownerOrTeam?'':p.id}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${ownerOrTeam?0:2592000}`);
 if(ownerOrTeam)result.headers.append('Set-Cookie',workspaceCookie(p.owner,req));
 return result;
}
