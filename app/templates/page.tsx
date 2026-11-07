import CatalogBrowser from './catalog-browser';import {requestLanguage} from '../../lib/public-language-server';import {publicMetadata} from '../../lib/public-metadata';
export async function generateMetadata({searchParams}:{searchParams:Promise<{lang?:string}>}){return publicMetadata(await requestLanguage((await searchParams).lang),'/templates',true)}
export default async function Page({searchParams}:{searchParams:Promise<{lang?:string}>}){return <CatalogBrowser catalogOnly initialLanguage={await requestLanguage((await searchParams).lang)}/>}
