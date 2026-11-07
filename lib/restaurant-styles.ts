import type {Language} from './languages';
import type {Spec} from './spec';
export const restaurantStyles={
 classic:{hero:'restaurant',photos:['dish','dish','dish'],names:{ru:['Сезонный салат','Блюдо на огне','Десерт к чаю'],uz:['Mavsumiy salat','Olovda taom','Shirinlik'],en:['Seasonal salad','From the grill','Dessert'],kk:['Маусымдық салат','Оттағы тағам','Десерт'],ky:['Мезгилдик салат','Оттогу тамак','Десерт'],tg:['Хӯриши мавсимӣ','Таом дар оташ','Ширинӣ']}},
 fastfood:{hero:'burger',photos:['burger','fries','pizza'],names:{ru:['Фирменный бургер','Картофель фри','Пицца'],uz:['Maxsus burger','Fri kartoshkasi','Pitsa'],en:['Signature burger','French fries','Pizza'],kk:['Фирмалық бургер','Фри картобы','Пицца'],ky:['Фирмалык бургер','Фри картошкасы','Пицца'],tg:['Бургери махсус','Картошкаи бирён','Питса']}},
 japanese:{hero:'sushi',photos:['sushi','sushi-rolls'],names:{ru:['Суши с лососем','Ассорти роллов'],uz:['Lososli sushi','Roll assorti'],en:['Salmon sushi','Roll selection'],kk:['Албырт сушиі','Ролл ассортиі'],ky:['Лосось сушиси','Ролл ассортиси'],tg:['Суши бо лосос','Роллҳои гуногун']}},
 national:{hero:'plov',photos:['plov','grill'],names:{ru:['Плов','Мясо на огне'],uz:['Osh','Kabob'],en:['Plov','Grilled meat'],kk:['Палау','Оттағы ет'],ky:['Палоо','Оттогу эт'],tg:['Ош','Гӯшти кабоб']}}
} satisfies Record<Spec['restaurantStyle'],{hero:string;photos:string[];names:Record<Language,string[]>}>;
const headlines:Record<Exclude<Spec['restaurantStyle'],'classic'>,Record<Language,string>>={
fastfood:{ru:'Большой вкус. Твой ритм.',uz:'Katta taʼm. Sizning ritmingiz.',en:'Big flavour. Your rhythm.',kk:'Үлкен дәм. Өз ырғағың.',ky:'Чоң даам. Өз ыргагың.',tg:'Таъми калон. Ритми шумо.'},
japanese:{ru:'Вкус в каждой детали.',uz:'Har bir tafsilotda taʼm.',en:'Flavour in every detail.',kk:'Әр бөлшекте дәм.',ky:'Ар бир деталда даам.',tg:'Маза дар ҳар ҷузъиёт.'},
national:{ru:'За одним дастарханом.',uz:'Bir dasturxon atrofida.',en:'Together around the table.',kk:'Бір дастарқан басында.',ky:'Бир дасторкон үстүндө.',tg:'Дар сари як дастархон.'}};
export function styleRestaurant(s:Spec,stock:string,example:string):Spec{
 const design=restaurantStyles[s.restaurantStyle];if(s.restaurantStyle==='classic')return s;
 const photo=(name:string)=>({src:'/images/'+name+'.webp',alt:stock,x:50,y:50,fit:'cover' as const});
 return {...s,headline:headlines[s.restaurantStyle][s.language],heroImage:photo(design.hero),gallery:design.photos.map(photo),items:design.names[s.language].map((title,i)=>({id:'example-dish-'+i,title,description:example,category:title,images:[photo(design.photos[i])],meta1:'',meta2:'',meta3:'',available:true,tags:i===0?['featured']:[]}))};
}
