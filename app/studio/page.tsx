import {languages,type Language} from '../../lib/languages';
import {requireChatGPTUser} from '../chatgpt-auth';
import StudioApp from '../studio-app';
import {templates} from '../../lib/template-catalog';
export const dynamic='force-dynamic';
export default async function Page({searchParams}:{searchParams:Promise<{template?:string;language?:string;tab?:string}>}){const search=await searchParams;const id=typeof search.template==='string'&&templates.some(t=>t.id===search.template)?search.template:undefined;const language=languages.find(l=>l.code===search.language)?.code||'ru';await requireChatGPTUser(id?'/studio?template='+encodeURIComponent(id)+'&language='+language:search.tab==='team'?'/studio?tab=team':'/studio');return <StudioApp initialTab={search.tab==='team'?'team':'templates'} initialTemplateId={id} initialLanguage={language}/>}
