import {publicLegalMetadata} from '../../lib/public-metadata';
import PublicLegalPage from '../public-legal-page';import {requestLanguage} from '../../lib/public-language-server';
export default async function Page({searchParams}:{searchParams:Promise<{lang?:string}>}){return <PublicLegalPage kind="terms" initialLanguage={await requestLanguage((await searchParams).lang)}/>}
export async function generateMetadata({searchParams}:{searchParams:Promise<{lang?:string}>}){return publicLegalMetadata(await requestLanguage((await searchParams).lang),'terms')}
