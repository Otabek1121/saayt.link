import type {Metadata} from 'next';
export const metadata:Metadata={title:'Saayt.link — сайты, меню и заявки для бизнеса',description:'Сайты для кафе, гостиниц и услуг. Меняйте фотографии, цены и контакты в кабинете. Получайте заявки клиентов в кабинете и Telegram.',robots:{index:true,follow:true},alternates:{canonical:'https://saayt.link/'},openGraph:{title:'Saayt.link — ваш бизнес по одной ссылке',description:'Меню, номера и услуги с кабинетом для редактирования.',url:'https://saayt.link/',images:[{url:'https://saayt.link/images/restaurant.webp',width:1440,height:960}]}};
import {redirect} from 'next/navigation';
import CatalogBrowser from './templates/catalog-browser';
export default async function Page({searchParams}:{searchParams:Promise<{template?:string;language?:string}>}){const s=await searchParams;if(s.template)redirect('/studio?template='+encodeURIComponent(s.template)+'&language='+encodeURIComponent(s.language||'ru'));return <CatalogBrowser/>}
