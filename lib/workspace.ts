import {headers} from 'next/headers';
import {getChatGPTUser,type ChatGPTUser} from '../app/chatgpt-auth';
import {getDb} from '../db';
import {studioMembers,projects,media,projectClients} from '../db/schema';
import {and,eq,or,isNull} from 'drizzle-orm';
export const CLIENT_SITE_COOKIE='saayt-client-site';
export const WORKSPACE_COOKIE='saayt-workspace';
export type WorkspaceUser=ChatGPTUser&{ownerId:string;role:'owner'|'editor'|'client';projectId?:string};
export const normalizedEmail=(email:string)=>email.trim().toLowerCase();
export function membershipIdentity(user:ChatGPTUser){return or(eq(studioMembers.userId,user.userId),and(isNull(studioMembers.userId),eq(studioMembers.email,normalizedEmail(user.email))))}
export async function getWorkspaceUser():Promise<WorkspaceUser|null>{
 const user=await getChatGPTUser();if(!user)return null;
 const h=await headers();const scope=h.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith(CLIENT_SITE_COOKIE+'='))?.slice(CLIENT_SITE_COOKIE.length+1);
 if(scope){const [p]=await getDb().select().from(projects).where(eq(projects.id,scope));if(!p||p.archived)return null;const [grant]=await getDb().select().from(projectClients).where(and(eq(projectClients.projectId,p.id),eq(projectClients.email,normalizedEmail(user.email))));if(!grant)return null;return {...user,ownerId:p.owner,role:'client',projectId:p.id}}
 const raw=h.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith(WORKSPACE_COOKIE+'='))?.slice(WORKSPACE_COOKIE.length+1);let ownerId=user.userId;
 if(raw){try{ownerId=decodeURIComponent(raw)}catch{return null}}
 if(ownerId===user.userId)return {...user,ownerId,role:'owner'};
 const [member]=await getDb().select().from(studioMembers).where(and(eq(studioMembers.owner,ownerId),eq(studioMembers.userId,user.userId),eq(studioMembers.status,'active')));
 return member?{...user,ownerId,role:'editor'}:null;
}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !origin||origin===new URL(req.url).origin}
export function workspaceCookie(ownerId:string,req:Request){return `${WORKSPACE_COOKIE}=${encodeURIComponent(ownerId)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${new URL(req.url).protocol==='https:'?'; Secure':''}`}

export function projectScope(u:WorkspaceUser){return and(eq(projects.owner,u.ownerId),u.projectId?eq(projects.id,u.projectId):undefined)}
export async function clientMediaIds(u:WorkspaceUser):Promise<string[]|null>{
 if(!u.projectId)return null;
 const [p]=await getDb().select().from(projects).where(and(eq(projects.id,u.projectId),eq(projects.owner,u.ownerId)));
 if(!p)return [];
 const {mediaSources}=await import('./spec');
 const ids=new Set<string>();
 for(const value of [p.spec,p.published])if(value)for(const src of mediaSources(JSON.parse(value)))ids.add(src.split('/').pop()!);
 const uploaded=await getDb().select({id:media.id}).from(media).where(and(eq(media.owner,u.ownerId),eq(media.projectId,u.projectId)));
 for(const asset of uploaded)ids.add(asset.id);
 return [...ids];
}
