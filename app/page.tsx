import {redirect} from 'next/navigation';
import NfcLanding from './nfc-landing';
export default async function Page({searchParams}:{searchParams:Promise<{template?:string;language?:string}>}){
 const s=await searchParams;
 if(s.template)redirect('/studio?template='+encodeURIComponent(s.template)+'&language='+encodeURIComponent(s.language||'ru'));
 return <NfcLanding/>;
}
