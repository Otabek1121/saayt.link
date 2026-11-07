import type {Metadata} from 'next';import './globals.css';import './design-system.css';
export const metadata:Metadata={title:'Saayt.link — студия сайтов для бизнеса',description:'Создавайте, редактируйте и сохраняйте сайты для своего бизнеса.',robots:{index:false,follow:false},icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ru"><body>{children}</body></html>}
