import type {Spec} from './spec';
import {phoneNumber} from './contact';
export type QualityCheck={key:string;label:string;hint:string;tab:string;ok:boolean};
export function siteQuality(s:Spec):QualityCheck[]{
 const contact=!!(phoneNumber(s.phone)||phoneNumber(s.whatsapp)||s.telegram||s.email);
 const examples=/^(Пример|Namuna|Example|Sample|Үлгі|Үлгү|Намуна|Таоми намунавӣ)/i;
 return [
 {key:'identity',label:'Название и описание',hint:'Укажите название компании и расскажите, что предлагаете.',tab:'content',ok:!!s.name.trim()&&!!s.description.trim()&&!['Ваш бренд','Your brand','Brendingiz','Сіздің брендіңіз','Сиздин брендиңиз','Бренди шумо'].includes(s.name.trim())},
 {key:'contacts',label:'Связь с компанией',hint:'Добавьте телефон, email или мессенджер для обращений.',tab:'content',ok:contact},
 {key:'action',label:'Главная кнопка',hint:'Заполните контакт, выбранный для действия главной кнопки.',tab:'content',ok:!!s.cta.trim()&&(s.action==='contacts'?contact:s.action==='call'?!!phoneNumber(s.phone):s.action==='whatsapp'?!!phoneNumber(s.whatsapp):!!s.telegram)},
 {key:'photo',label:'Своё главное фото',hint:'Замените пример оформления фотографией вашей компании.',tab:'photos',ok:!!s.heroImage?.src.startsWith('/api/media/')},
 {key:'content',label:'Содержание без стартовых примеров',hint:'Замените примеры своими блюдами, товарами или услугами.',tab:'offer',ok:s.sections.items?s.items.length>0&&s.items.every(i=>!examples.test(i.description)&&!examples.test(i.title)&&i.title!=='Новая позиция'):!!s.about.trim()},
 {key:'alt',label:'Подписи фотографий',hint:'Заполните описания добавленных фото для доступности.',tab:'photos',ok:[s.heroImage,s.logo,...(s.sections.gallery?s.gallery:[]),...(s.sections.items?s.items.flatMap(i=>i.images):[]),...(s.sections.team?s.team.map(t=>t.photo):[])].filter(Boolean).every(p=>!!p?.alt.trim())},
 {key:'seo',label:'Описание для поиска и ссылок',hint:'Заполните заголовок и описание во вкладке «Поиск и соцсети».',tab:'seo',ok:!!s.seo.title.trim()&&!!s.seo.description.trim()}
 ];
}
