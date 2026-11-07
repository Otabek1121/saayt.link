import {getWorkspaceUser,projectScope} from '../../../lib/workspace';
import {getDb} from '../../../db';import {projects} from '../../../db/schema';import {eq,and} from 'drizzle-orm';import {requireChatGPTUser} from '../../chatgpt-auth';import SiteView from '../../site-view';import {normalizeSpec} from '../../../lib/spec';import {notFound} from 'next/navigation';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;await requireChatGPTUser('/site/'+id);const u=await getWorkspaceUser();if(!u)notFound();const [r]=await getDb().select().from(projects).where(and(eq(projects.id,id),projectScope(u)));if(!r?.published||r.archived)notFound();return <SiteView spec={normalizeSpec(JSON.parse(r.published))}/>;}
