'use client';

import {useEffect,useState} from 'react';
import {ArrowUpRight,ArrowRight,Check,ChevronDown,Contact,Globe2,Instagram,MapPin,Menu,Nfc,Phone,ShieldCheck,Smartphone,Star,Wifi,X} from 'lucide-react';
import './nfc-landing.css';

const products=[
  {number:'01',name:'NFC визитки',uz:'NFC vizitkalar',description:'Контакты, соцсети и портфолио — одним касанием. Для предпринимателей, специалистов и команд.',icon:Contact,style:'card'},
  {number:'02',name:'QR и NFC таблички',uz:'QR va NFC tablichkalar',description:'Для стойки, кассы или ресепшена: отзывы, меню, геолокация и быстрые ссылки.',icon:Nfc,style:'plaque'},
  {number:'03',name:'Цифровые страницы',uz:'Raqamli sahifalar',description:'Персональная визитка или мини-сайт, который можно обновлять без замены карточки.',icon:Smartphone,style:'phone'},
  {number:'04',name:'Для ресторанов и бизнеса',uz:'Biznes uchun',description:'Меню, контакты, каталог и ссылки для гостей — в одном удобном месте.',icon:Globe2,style:'stand'},
];

const faq=[
  ['Что такое NFC?','NFC позволяет открыть цифровую страницу на совместимом телефоне одним касанием к карточке или табличке. На других устройствах можно использовать QR-код.'],
  ['Нужно ли устанавливать приложение?','Нет. Контактная информация, сайт или меню открываются в обычном браузере.'],
  ['Можно ли поменять телефон, ссылки и описание позже?','Да, если на карточку записана управляемая ссылка на цифровую страницу Saayt.link, данные можно обновить в редакторе, не печатая новую карточку.'],
  ['Работает ли QR-код без NFC?','Да. QR-код можно открыть камерой телефона, если есть доступ к странице по ссылке.'],
  ['Можно ли выбрать цвет и стиль?','Да, оформление цифровой визитки можно выбрать в конструкторе. Дизайн физической карточки или таблички обсуждается при заказе.'],
];
const steps=[
  ['01','Выберите формат','Визитка, табличка или цифровая страница.'],
  ['02','Настройте данные','Добавьте контакты, ссылки, фотографии и цвета.'],
  ['03','Получите ссылку и QR','Используйте страницу онлайн или привяжите её к NFC-изделию.'],
];

function DemoCard({small=false}:{small?:boolean}){
 return <div className={'nfc-demo-card '+(small?'is-small':'')}>
   <div className="nfc-demo-top"><span className="nfc-demo-mark">saayt<span>.</span>link</span><Wifi size={27} strokeWidth={1.6}/></div>
   <div className="nfc-demo-graphic"><span className="nfc-demo-ring ring-one"/><span className="nfc-demo-ring ring-two"/><span className="nfc-demo-ring ring-three"/><Nfc size={46} strokeWidth={1.15}/></div>
   <div className="nfc-demo-bottom"><span>YOUR DIGITAL<br/>IDENTITY</span><strong>ONE TAP.</strong></div>
 </div>
}
export default function NfcLanding(){
 const [menuOpen,setMenuOpen]=useState(false);
 const [openedFaq,setOpenedFaq]=useState<number|null>(0);
 const [scroll,setScroll]=useState(false);
 useEffect(()=>{const handler=()=>setScroll(window.scrollY>32);handler();window.addEventListener('scroll',handler,{passive:true});return()=>window.removeEventListener('scroll',handler)},[]);
 return <div className="nfc-landing" id="top">
  <a className="nfc-skip" href="#nfc-main">Перейти к содержимому</a>
  <header className={'nfc-header '+(scroll?'is-scrolled':'')}>
   <div className="nfc-shell nfc-header-inner">
    <a className="nfc-logo" href="#top" aria-label="Saayt.link — главная">saayt<span>.</span>link<span className="nfc-logo-label">NFC STUDIO</span></a>
    <nav className={'nfc-nav '+(menuOpen?'is-open':'')} aria-label="Главное меню">
      <a href="#products" onClick={()=>setMenuOpen(false)}>Продукты</a>
      <a href="#how" onClick={()=>setMenuOpen(false)}>Как работает</a>
      <a href="#works" onClick={()=>setMenuOpen(false)}>Наши работы</a>
      <a href="#faq" onClick={()=>setMenuOpen(false)}>Вопросы</a>
      <a href="/templates" onClick={()=>setMenuOpen(false)}>Шаблоны</a>
    </nav>
    <a className="nfc-header-cta" href="/studio">Создать страницу <ArrowUpRight size={17}/></a>
    <button className="nfc-mobile-toggle" aria-label={menuOpen?'Закрыть меню':'Открыть меню'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
   </div>
  </header>
  <main id="nfc-main">
   <section className="nfc-hero">
     <div className="nfc-hero-glow" aria-hidden="true"/>
     <div className="nfc-shell nfc-hero-grid">
       <div className="nfc-hero-copy">
         <div className="nfc-eyebrow"><span className="nfc-live-dot"/> NFC • QR • DIGITAL BUSINESS</div>
         <h1>Одно касание.<br/><em>Новые возможности.</em></h1>
         <p>Современные NFC-визитки, QR-таблички и цифровые страницы для вашего бизнеса. Ваши контакты, услуги и ссылки — всегда под рукой.</p>
         <div className="nfc-hero-actions"><a href="/studio" className="nfc-button nfc-button-light">Создать визитку <ArrowUpRight size={20}/></a><a href="#products" className="nfc-button nfc-button-outline">Посмотреть продукты <ArrowRight size={19}/></a></div>
         <div className="nfc-hero-note"><span className="nfc-note-avatars"><i>✦</i><i>↗</i><i>◎</i></span><span>Одна цифровая страница — множество способов поделиться</span></div>
       </div>
       <div className="nfc-hero-visual" aria-label="Пример NFC визитки и цифрового профиля">
        <div className="nfc-floating-text nfc-float-a">TAP<br/>TO CONNECT <ArrowUpRight size={16}/></div>
        <div className="nfc-hero-orbit orbit-a"/><div className="nfc-hero-orbit orbit-b"/>
        <div className="nfc-profile-preview"><div className="nfc-preview-avatar">S</div><strong>Ваше имя</strong><small>Ваша компания · Digital card</small><div className="nfc-preview-line"><Phone size={15}/> Позвонить <ArrowUpRight size={14}/></div><div className="nfc-preview-line"><Instagram size={15}/> Социальные сети <ArrowUpRight size={14}/></div><div className="nfc-preview-line"><MapPin size={15}/> Адрес и карта <ArrowUpRight size={14}/></div></div>
        <DemoCard/>
        <div className="nfc-floating-badge"><span><Check size={15}/></span> NFC + QR READY</div>
        <div className="nfc-floating-text nfc-float-b">THE FUTURE<br/>IS CONTACTLESS</div>
       </div>
     </div>
     <div className="nfc-shell nfc-hero-bottom"><span>ПРОКРУТИТЕ ВНИЗ, ЧТОБЫ УЗНАТЬ БОЛЬШЕ</span><span>01 / 06</span></div>
   </section>
   <div className="nfc-marquee" aria-label="Возможности"><div className="nfc-marquee-track">{Array.from({length:2},(_,i)=><span key={i}>NFC ВИЗИТКИ <b>✳</b> QR ТАБЛИЧКИ <b>✳</b> ЦИФРОВОЙ ПРОФИЛЬ <b>✳</b> SMART BUSINESS <b>✳</b> </span>)}</div></div>
   <section className="nfc-section nfc-intro" id="about">
    <div className="nfc-shell nfc-intro-grid"><div><span className="nfc-section-label">01 / НОВЫЙ ФОРМАТ ЗНАКОМСТВА</span><h2>Первое впечатление<br/>теперь <em>цифровое.</em></h2></div><div><p>Забудьте о десятках бумажных визиток и длинных поисках нужной ссылки. Достаточно одного касания или сканирования QR-кода, чтобы ваши клиенты получили всё необходимое.</p><a className="nfc-inline-link" href="/templates">Посмотреть шаблоны <ArrowUpRight size={18}/></a></div></div>
   </section>
   <section className="nfc-section nfc-products" id="products">
    <div className="nfc-shell">
     <div className="nfc-section-head"><div><span className="nfc-section-label">02 / ЧТО МЫ ПРЕДЛАГАЕМ</span><h2>Решения, которые<br/><em>работают на вас.</em></h2></div><p>От личной визитки до презентации целого бизнеса.</p></div>
     <div className="nfc-product-grid">{products.map((p)=><article className="nfc-product" key={p.number}><div className="nfc-product-top"><span>{p.number} / 04</span><p.icon size={24} strokeWidth={1.6}/></div><div className={'nfc-product-art art-'+p.style} aria-hidden="true">{p.style==='card'?<DemoCard small/>:p.style==='phone'?<div className="nfc-art-phone"><span>saayt.link</span><div className="nfc-art-avatar">S</div><i/><i/><i/></div>:p.style==='plaque'?<div className="nfc-art-plaque"><Nfc size={44}/><div className="nfc-faux-qr">▦</div><small>SCAN OR TAP</small></div>:<div className="nfc-art-stand"><span>YOUR BRAND</span><div className="nfc-faux-qr">▦</div><small>MENU • CONTACTS</small></div>}</div><div className="nfc-product-description"><span className="nfc-product-eyebrow">{p.uz}</span><h3>{p.name}</h3><p>{p.description}</p><a href="/studio" aria-label={'Создать страницу: '+p.name}>Создать <ArrowUpRight size={17}/></a></div></article>)}</div>
    </div>
   </section>
   <section className="nfc-feature-band"><div className="nfc-shell nfc-feature-grid"><div><Nfc size={30}/><h3>Одно касание</h3><p>Контакты открываются мгновенно на совместимых устройствах.</p></div><div><Globe2 size={30}/><h3>Всегда актуально</h3><p>Обновляйте данные на своей цифровой странице.</p></div><div><ShieldCheck size={30}/><h3>Без приложения</h3><p>Получателю нужен только браузер или камера телефона.</p></div></div></section>
   <section className="nfc-section nfc-how" id="how"><div className="nfc-shell"><div className="nfc-section-head"><div><span className="nfc-section-label">03 / ЭТО ПРОСТО</span><h2>Три шага.<br/><em>Без лишних сложностей.</em></h2></div></div><div className="nfc-step-grid">{steps.map(([n,title,body])=><article key={n}><span className="nfc-step-number">{n}</span><div className="nfc-step-line"/><h3>{title}</h3><p>{body}</p></article>)}</div><div className="nfc-how-actions"><a href="/studio" className="nfc-button nfc-button-dark">Начать сейчас <ArrowUpRight size={19}/></a></div></div></section>
   <section className="nfc-section nfc-demo-section"><div className="nfc-shell nfc-demo-grid"><div className="nfc-demo-show"><div className="nfc-demo-halo"/><DemoCard/><span className="nfc-demo-point">01 — NFC</span><span className="nfc-demo-point point-two">02 — QR</span></div><div className="nfc-demo-copy"><span className="nfc-section-label">04 / КАК ЭТО ВЫГЛЯДИТ</span><h2>Технологии,<br/>которые <em>впечатляют.</em></h2><p>Поднесите телефон к NFC-карточке или наведите камеру на QR-код. Откроется ваша персональная страница с актуальными контактами, ссылками и информацией.</p><div className="nfc-check-list"><span><Check size={17}/> Контакты и мессенджеры</span><span><Check size={17}/> Сайт, меню или портфолио</span><span><Check size={17}/> Карта и адрес</span><span><Check size={17}/> Возможность обновлять информацию</span></div><a className="nfc-inline-link" href="/templates">Выбрать дизайн <ArrowUpRight size={18}/></a></div></div></section>
   <section className="nfc-section nfc-works" id="works"><div className="nfc-shell"><div className="nfc-section-head"><div><span className="nfc-section-label">05 / ПОРТФОЛИО</span><h2>Наши <em>работы.</em></h2></div><p>Здесь появятся реальные проекты, фотографии и готовые NFC-изделия.</p></div><div className="nfc-works-empty"><span className="nfc-empty-icon"><Star size={34} strokeWidth={1}/></span><strong>Скоро здесь появятся наши работы</strong><p>Мы готовим галерею выполненных проектов. Пока раздел оставлен свободным.</p></div></div></section>
   <section className="nfc-section nfc-faq" id="faq"><div className="nfc-shell nfc-faq-grid"><div><span className="nfc-section-label">06 / ПОЛЕЗНО ЗНАТЬ</span><h2>Частые<br/><em>вопросы.</em></h2><p>Не нашли ответ? Создайте цифровую страницу в конструкторе и посмотрите, как всё устроено.</p><a className="nfc-inline-link" href="/studio">Открыть конструктор <ArrowUpRight size={18}/></a></div><div className="nfc-faq-list">{faq.map(([question,answer],i)=><div className={'nfc-faq-item '+(openedFaq===i?'active':'')} key={question}><button aria-expanded={openedFaq===i} onClick={()=>setOpenedFaq(openedFaq===i?null:i)}><span>{question}</span><ChevronDown size={19}/></button>{openedFaq===i&&<p>{answer}</p>}</div>)}</div></div></section>
   <section className="nfc-cta-section"><div className="nfc-shell nfc-cta-inner"><span className="nfc-section-label">НАЧНИТЕ СЕГОДНЯ</span><h2>Ваш бизнес заслуживает<br/><em>лучшего первого впечатления.</em></h2><p>Создайте современную цифровую визитку и делитесь ею через ссылку, QR-код или NFC.</p><div className="nfc-cta-buttons"><a className="nfc-button nfc-button-light" href="/studio">Создать свою страницу <ArrowUpRight size={20}/></a><a className="nfc-button nfc-button-outline" href="/templates">Посмотреть шаблоны <ArrowRight size={19}/></a></div><div className="nfc-cta-decoration">S.</div></div></section>
  </main>
  <footer className="nfc-footer"><div className="nfc-shell nfc-footer-top"><div><a className="nfc-logo" href="#top">saayt<span>.</span>link</a><p>Умные решения для современного бизнеса.<br/>NFC • QR • Цифровые страницы</p></div><div className="nfc-footer-links"><a href="#products">Продукты</a><a href="#how">Как это работает</a><a href="#works">Наши работы</a><a href="#faq">FAQ</a></div><div className="nfc-footer-links"><a href="/templates">Шаблоны</a><a href="/studio">Конструктор</a><a href="/studio">Личный кабинет</a></div></div><div className="nfc-shell nfc-footer-bottom"><span>© {new Date().getFullYear()} Saayt.link</span><span>Сделано для новых возможностей ✳</span></div></footer>
 </div>
}
