'use client';
import {useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,Plus} from 'lucide-react';

// Add approved real projects here. Keep customer links and images public.
export const portfolioItems: {id:string; title:string; image:string; url?:string}[] = [];
export default function PortfolioCarousel(){
 const track=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);
 const count=portfolioItems.length||3;
 function move(direction:number){
  const next=(active+direction+count)%count;
  track.current?.scrollTo({left:next*(track.current.clientWidth),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 }
 return <div className="portfolio-showcase" role="region" aria-roledescription="карусель" aria-label="Портфолио визиток">
  <div className="portfolio-caption"><span>Визитки с характером</span><span>{String(active+1).padStart(2,'0')} / {String(count).padStart(2,'0')}</span></div>
  <div className="portfolio-track" ref={track} onScroll={()=>{const el=track.current;if(el)setActive(Math.round(el.scrollLeft/el.clientWidth));}} tabIndex={0} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}}}>
   {portfolioItems.length?portfolioItems.map(item=><article className="portfolio-slide" key={item.id}><img src={item.image} alt={item.title} loading="lazy"/>{item.url?<a href={item.url}>{item.title} ↗</a>:<strong>{item.title}</strong>}</article>):Array.from({length:3},(_,i)=><article className="portfolio-slide portfolio-placeholder" key={i}><div className="portfolio-card-outline"><Plus size={40} strokeWidth={1}/><span>NFC + QR</span></div><strong>Здесь появится новая работа</strong><p>Готовим реальные визитки и проекты для этой коллекции.</p></article>)}
  </div>
  <div className="portfolio-controls"><p aria-live="polite">{portfolioItems.length?'Листайте и знакомьтесь с нашими работами':'Портфолио скоро пополнится'}</p><div><button aria-label="Предыдущая визитка" onClick={()=>move(-1)}><ArrowLeft size={20}/></button><button aria-label="Следующая визитка" onClick={()=>move(1)}><ArrowRight size={20}/></button></div></div>
 </div>
}
