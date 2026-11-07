import {redirect} from 'next/navigation';import CatalogBrowser from './templates/catalog-browser';import {requestLanguage} from '../lib/public-language-server';import {publicMetadata} from '../lib/public-metadata';
type Search={template?:string;language?:string;lang?:string};
export async function generateMetadata({searchParams}:{searchParams:Promise<Search>}){return publicMetadata(await requestLanguage((await searchParams).lang),'/')}
export default async function Page({searchParams}:{searchParams:Promise<Search>}){const s=await searchParams;if(s.template)redirect('/studio?template='+encodeURIComponent(s.template)+'&language='+encodeURIComponent(s.language||'ru'));return <CatalogBrowser initialLanguage={await requestLanguage(s.lang)}/>}
