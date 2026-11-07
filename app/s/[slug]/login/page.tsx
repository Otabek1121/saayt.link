import {notFound} from 'next/navigation';import {findPublicSite} from '../../../../lib/public-site';import ClientLogin from '../../../client-login';
export const dynamic='force-dynamic';
export const metadata={title:'Вход в кабинет клиента — Saayt.link',robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const site=await findPublicSite(slug);if(!site)notFound();return <ClientLogin slug={slug} name={site.spec.name}/>}
