import {hostelTemplate} from './hostel';
import {restaurantTemplate} from './restaurant';
import {text,nativeText} from './languages';
import {imagePath} from './visuals';
import {presets,type Niche} from './niches';import {generate,normalizeSpec,type Spec} from './spec';
export const templateStyles={editorial:{label:'Минимализм',name:'Clarity',color:'#3f5963'},soft:{label:'Мягкий',name:'Atelier',color:'#87516a'},architectural:{label:'Архитектурный',name:'Structure',color:'#756047'},immersive:{label:'Фотографический',name:'Panorama',color:'#456157'}} as const;
export type TemplateStyle=keyof typeof templateStyles;
export type Template={id:string;niche:Niche;style:TemplateStyle;name:string;description:string;headline:string;layout:string;color:string;restaurantStyle?:Spec['restaurantStyle']};
const designs:[Niche,string,string,string,string,TemplateStyle][]=[
['hostel','Точка отдыха','Ваше место в новом городе','stay','#347263','editorial'],
['restaurant','За столом','Место для вкусных встреч','banquet','#703b2a','immersive'],
['nails','Линия','Красота в каждом движении','atelier','#9a4563','soft'],
['construction','Контур','От замысла — к пространству','structure','#a46b32','architectural'],
['dentistry','Улыбка','Забота, которую видно','care','#286d73','editorial'],
['retail','Витрина','Найдите свою любимую вещь','shop','#555a38','editorial'],
['school','Горизонт','Больше знаний. Больше возможностей.','campus','#445fa1','soft'],
['legal','Основание','Ясность в сложных вопросах','authority','#544d3d','architectural'],
['beauty','Образ','Время, посвящённое себе','atelier','#775c70','soft'],
['medical','Пульс','Начните с заботы о себе','care','#347263','editorial'],
['kindergarten','Росток','Большой мир для маленьких открытий','campus','#b06a39','soft'],
['accounting','Баланс','Порядок в цифрах. Свобода в делах.','authority','#405c55','architectural'],
['plumbing','Чистая форма','Детали вашего комфорта','shop','#317c83','editorial'],
['wedding','История','День, который станет вашей историей','story','#845b64','soft'],
['fitness','Импульс','Движение начинается с вас','structure','#9a583d','architectural'],
['realestate','Место','Пространство для новой главы','portfolio','#6b6954','immersive'],
['auto','Траектория','Ваш автомобиль в надёжных руках','structure','#51687a','architectural'],
['cleaning','Свежесть','Больше чистоты. Больше времени для себя.','care','#437e77','editorial'],
['it','Сдвиг','Идеи становятся работающими продуктами','studio','#5c51a6','editorial'],
['logistics','Маршрут','Соединяем точки вашего бизнеса','authority','#526c82','architectural'],
['travel','Далеко','Пора увидеть что-то новое','portfolio','#a46539','immersive'],
['photography','Кадр','Сохранить то, что чувствуете','portfolio','#5d534b','immersive'],
['furniture','Предмет','Дом складывается из деталей','shop','#86654d','editorial'],
['repair','Мастерская','Вернём привычным вещам жизнь','studio','#626b42','editorial'],
['generic','Точка','Ваше дело заслуживает своего сайта','studio','#5056a0','editorial']];
export const templates:Template[]=designs.map(([niche,name,headline,layout,color,style])=>({id:'forma-'+niche,niche,name,headline,layout,color,style,description:presets[niche].description,...(niche==='restaurant'?{restaurantStyle:'national' as const}: {})}));
templates.push({id:'forma-restaurant-fastfood',niche:'restaurant',style:'editorial',name:'На ходу',description:'Фастфуд: бургеры, пицца и любимые закуски.',headline:'Большой вкус. Твой ритм.',layout:'shop',color:'#9c3b24',restaurantStyle:'fastfood'}, {id:'forma-restaurant-japanese',niche:'restaurant',style:'architectural',name:'Тихий вкус',description:'Японская кухня: лаконичное меню и акцент на деталях.',headline:'Вкус в каждой детали.',layout:'atelier',color:'#b74737',restaurantStyle:'japanese'});
export function makeTemplate(t:Template,language:Spec['language']='ru'){
 const s=generate(({ru:'Ваш бренд',uz:'Brendingiz',en:'Your brand',kk:'Сіздің брендіңіз',ky:'Сиздин брендиңиз',tg:'Бренди шумо'})[language],t.niche,'',language,presets[t.niche].label);
 const stock=text(language,'Фото для примера','Namuna surat','Illustrative stock photograph');
 const base=normalizeSpec({...s,headline:language==='ru'?t.headline:s.headline,aboutTitle:language==='ru'?t.headline:s.aboutTitle,about:language==='ru'?presets[t.niche].description:s.about,
 gallery:[{src:imagePath(t.niche),alt:stock,x:50,y:50,fit:'cover'}],
 items:s.items.length?s.items:s.services.map((title,i)=>({id:'example-'+i,title,description:text(language,'Пример карточки. Замените название и описание перед публикацией.','Namuna. Nashrdan oldin nom va tavsifni almashtiring.','Example card. Replace the title and description before publishing.'),category:text(language,'Примеры','Namunalar','Examples'),images:i===0?[{src:imagePath(t.niche),alt:stock,x:50,y:50,fit:'cover'}]:[],meta1:'',meta2:'',meta3:''})),
 templateStyle:t.style,templateId:t.id,color:t.color,sections:{...s.sections,motion:true}});
 return t.niche==='hostel'?normalizeSpec(hostelTemplate(base)):t.niche==='restaurant'?normalizeSpec(restaurantTemplate({...base,restaurantStyle:t.restaurantStyle||'classic'})):base;
}
export function templateDesign(id?:string){return templates.find(t=>t.id===id)}
export function parseTemplateFile(text:string):Spec{if(new TextEncoder().encode(text).length>256000)throw Error('Файл больше 256 КБ. Используйте экспорт шаблона Saayt.link.');let raw;try{raw=JSON.parse(text)}catch{throw Error('Не удалось прочитать JSON. Выберите файл шаблона Saayt.link.')}if(raw?.format==='forma-template'&&raw.version!==1)throw Error('Эта версия файла пока не поддерживается');try{return normalizeSpec(raw?.format==='forma-template'?raw.spec:raw)}catch{throw Error('Файл не соответствует формату Saayt.link. Выберите файл, сохранённый в нашем редакторе.')}}
export function exportTemplate(s:Spec){return JSON.stringify({format:'forma-template',version:1,spec:normalizeSpec(s)},null,2)}

export function designSectionOrder(layout:string){const orders:Record<string,string[]>={banquet:['items','gallery','about','details','team','faq','tagline','process'],shop:['items','gallery','details','about','faq','team','process','tagline'],care:['items','team','about','details','faq','process','gallery','tagline'],campus:['about','items','team','gallery','details','faq','process','tagline'],authority:['items','about','team','process','details','faq','gallery','tagline'],portfolio:['gallery','about','items','tagline','details','team','faq','process'],story:['tagline','about','gallery','items','details','team','faq','process'],structure:['items','gallery','process','about','team','details','faq','tagline'],atelier:['items','gallery','team','about','details','faq','tagline','process'],studio:['about','items','process','gallery','team','details','faq','tagline']};return orders[layout]||orders.studio}
