import {headers} from 'next/headers';import {publicLanguage} from '../lib/public-i18n';
import type {Metadata} from 'next';import './globals.css';import './design-system.css';
export const metadata:Metadata={title:'Saayt.link — студия сайтов для бизнеса',description:'Создавайте, редактируйте и сохраняйте сайты для своего бизнеса.',icons:{icon:'/favicon.svg'}};
export default async function Layout({children}:{children:React.ReactNode}){const language=publicLanguage((await headers()).get('x-saayt-public-language'))||'ru';return <html lang={language}><body>{children}</body></html>}
