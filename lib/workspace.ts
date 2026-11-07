import {headers} from 'next/headers';
import {getChatGPTUser,type ChatGPTUser} from '../app/chatgpt-auth';
import {getDb} from '../db';
import {studioMembers} from '../db/schema';
import {and,eq,or,isNull} from 'drizzle-orm';
export const WORKSPACE_COOKIE='saayt-workspace';
export type WorkspaceUser=ChatGPTUser&{ownerId:string;role:'owner'|'editor'};
export const normalizedEmail=(email:string)=>email.trim().toLowerCase();
export function membershipIdentity(user:ChatGPTUser){return or(eq(studioMembers.userId,user.userId),and(isNull(studioMembers.userId),eq(studioMembers.email,normalizedEmail(user.email))))}
export async function getWorkspaceUser():Promise<WorkspaceUser|null>{
 const user=await getChatGPTUser();if(!user)return null;
 const h=await headers();const raw=h.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith(WORKSPACE_COOKIE+'='))?.slice(WORKSPACE_COOKIE.length+1);let ownerId=user.userId;
 if(raw){try{ownerId=decodeURIComponent(raw)}catch{return null}}
 if(ownerId===user.userId)return {...user,ownerId,role:'owner'};
 const [member]=await getDb().select().from(studioMembers).where(and(eq(studioMembers.owner,ownerId),eq(studioMembers.userId,user.userId),eq(studioMembers.status,'active')));
 return member?{...user,ownerId,role:'editor'}:null;
}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !origin||origin===new URL(req.url).origin}
export function workspaceCookie(ownerId:string,req:Request){return `${WORKSPACE_COOKIE}=${encodeURIComponent(ownerId)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${new URL(req.url).protocol==='https:'?'; Secure':''}`}
