'use client';
import {templates,type Template} from '../lib/template-catalog';
export default function CatalogCover({onPreview}:{onPreview:(t:Template)=>void}){
 const restaurant=templates.find(t=>t.id==='forma-restaurant-fastfood')!;const stay=templates.find(t=>t.niche==='hostel')!;
 return <div className="catalog-cover" aria-label="Примеры сайтов Saayt.link"><button className="cover-restaurant" onClick={()=>onPreview(restaurant)} aria-label="Посмотреть пример сайта фастфуда"><div><span>На ходу</span><span aria-hidden="true">↗</span></div><strong>Большой вкус.<br/>Твой ритм.</strong><img src="/images/burger.webp" alt="Бургер, пример фотографии для меню" width="720" height="600" fetchPriority="high"/><span className="cover-caption">Фастфуд · меню и контакты</span></button><button className="cover-stay" onClick={()=>onPreview(stay)} aria-label="Посмотреть пример сайта хостела"><img src="/images/hostel.webp" alt="Пример фотографии хостела" width="480" height="320"/><div><span>Точка отдыха</span><strong>Место для<br/>новой истории</strong><span>Хостел · номера и бронирование ↗</span></div></button><span className="cover-stamp">Ваше дело.<br/>Ваш сайт.</span></div>;
}
