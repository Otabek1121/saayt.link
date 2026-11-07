import {styleRestaurant} from './restaurant-styles';
import type {Language} from './languages';
import type {Spec} from './spec';
// Restaurant labels are independent of owner-authored content.
const labels={
menu:['Меню','Menyu','Menu','Мәзір','Меню','Меню'],
book:['Запросить столик','Stol soʻrash','Request a table','Үстел сұрау','Үстөл суроо','Дархости миз'],
visit:['В гостях у нас','Bizga tashrif','Visit us','Бізге келіңіз','Бизге келиңиз','Ба мо меҳмон шавед'],
search:['Найти блюдо или ингредиент','Taom yoki masalliqni qidirish','Find a dish or ingredient','Тағам не ингредиент іздеу','Тамак же курам издөө','Ҷустуҷӯи таом ё таркиб'],
all:['Всё меню','Barcha taomlar','Full menu','Барлық мәзір','Толук меню','Ҳамаи меню'],
empty:['По вашему запросу блюд нет','Soʻrov boʻyicha taom topilmadi','No dishes match your search','Сұраныс бойынша тағам жоқ','Суроо боюнча тамак табылган жок','Таом ёфт нашуд'],
reset:['Сбросить фильтры','Filtrlarni tozalash','Reset filters','Сүзгілерді тазалау','Чыпкаларды тазалоо','Пок кардани филтрҳо'],
sold:['Временно нет','Vaqtincha yoʻq','Currently unavailable','Уақытша жоқ','Убактылуу жок','Муваққатан нест'],
featured:['Выбор шефа','Oshpaz tavsiyasi','Chef’s choice','Аспаз таңдауы','Ашпозчунун тандоосу','Интихоби ошпаз'],
vegetarian:['Вегетарианское','Vegetarian','Vegetarian','Вегетариандық','Вегетариандык','Гиёҳхорӣ'],
spicy:['Острое','Achchiq','Spicy','Ащы','Ачуу','Тунд'],
weight:['Порция','Porsiya','Portion','Порция','Порция','Ҳисса'],
ingredients:['Состав','Tarkibi','Ingredients','Құрамы','Курамы','Таркиб'],
allergens:['Аллергены','Allergenlar','Allergens','Аллергендер','Аллергендер','Аллергенҳо'],
allergyNote:['Если у вас аллергия, уточните состав у команды до заказа.','Allergiyangiz boʻlsa, buyurtmadan oldin tarkibni aniqlang.','If you have allergies, confirm ingredients with the team before ordering.','Аллергия болса, тапсырыс алдында құрамын нақтылаңыз.','Аллергияңыз болсо, буйрутмадан мурун курамын тактаңыз.','Агар аллергия дошта бошед, пеш аз фармоиш таркибро пурсед.'],
name:['Ваше имя','Ismingiz','Your name','Атыңыз','Атыңыз','Номи шумо'],
date:['Дата','Sana','Date','Күні','Күнү','Сана'],time:['Время','Vaqt','Time','Уақыты','Убакыт','Вақт'],guests:['Гостей','Mehmonlar','Guests','Қонақтар','Коноктор','Меҳмонон'],
phone:['Телефон для связи','Aloqa raqami','Contact phone','Байланыс телефоны','Байланыш телефону','Телефони тамос'],
note:['Пожелания','Istaklar','Special requests','Тілектер','Каалоолор','Хоҳишҳо'],
request:['Запрос на столик','Stol uchun soʻrov','Table request','Үстелге сұраныс','Үстөлгө суроо','Дархости миз'],
send:['Открыть WhatsApp с запросом','Soʻrov bilan WhatsApp ochish','Open request in WhatsApp','WhatsApp арқылы сұрау','WhatsApp аркылуу суроо','Кушодани дархост дар WhatsApp'],
confirm:['Это запрос, а не подтверждённая бронь. Отправьте сообщение в WhatsApp и дождитесь ответа ресторана.','Bu soʻrov, tasdiqlangan bandlov emas. WhatsApp orqali yuboring va restoran javobini kuting.','This is a request, not a confirmed reservation. Send it in WhatsApp and wait for the restaurant’s reply.','Бұл сұраныс, расталған бронь емес. WhatsApp арқылы жіберіп, жауап күтіңіз.','Бул суроо, ырасталган бронь эмес. WhatsApp аркылуу жөнөтүп, жооп күтүңүз.','Ин дархост аст, на бронкунии тасдиқшуда. Дар WhatsApp фиристед ва ҷавобро интизор шавед.'],
call:['Позвонить','Qoʻngʻiroq qilish','Call','Қоңырау шалу','Чалуу','Занг задан'],
map:['Как добраться','Qanday borish','Get directions','Қалай жетуге болады','Кантип жетүү керек','Чӣ тавр расидан'],
contact:['Контакты','Aloqa','Contact','Байланыс','Байланыш','Тамос'],
about:['Наша история','Biz haqimizda','Our story','Біздің тарих','Биздин тарых','Таърихи мо'],
gallery:['Атмосфера','Muhit','The atmosphere','Атмосфера','Атмосфера','Муҳит'],
booking:['Бронирование','Stol band qilish','Reservations','Броньдау','Брондоо','Бронкунӣ'],
delivery:['Доставка и самовывоз','Yetkazish va olib ketish','Delivery and pickup','Жеткізу және алып кету','Жеткирүү жана алып кетүү','Расонидан ва бо худ бурдан'],
events:['Ваше событие','Tadbiringiz','Your event','Сіздің іс-шараңыз','Сиздин иш-чараңыз','Чорабинии шумо'],
hours:['Часы работы','Ish vaqti','Opening hours','Жұмыс уақыты','Иш убактысы','Соатҳои корӣ'],
faq:['Частые вопросы','Koʻp beriladigan savollar','Common questions','Жиі сұрақтар','Көп берилүүчү суроолор','Саволҳои маъмул'],
stock:['Стоковое фото для примера','Namuna uchun stok surat','Illustrative stock photograph','Үлгі фото','Үлгү сүрөт','Акси намунавӣ'],
back:['В студию','Studiyaga','Back to studio','Студияға','Студияга','Ба студия'],
missing:['Контакты пока не добавлены','Aloqa hali qoʻshilmagan','Contact details have not been added','Байланыс қосылмаған','Байланыш кошула элек','Тамос ҳанӯз илова нашудааст'],
headline:['Встречаемся за хорошим столом','Yaxshi dasturxon atrofida uchrashamiz','Good food. Time together.','Жақсы дастарқан басында кездесейік','Жакшы дасторкон үстүндө жолугалы','Дар сари дастархони хуб вохӯрем'],
description:['Посмотрите меню, выберите любимые блюда и свяжитесь с нами, чтобы договориться о визите.','Menyuni koʻring, sevimli taomlaringizni tanlang va tashrif uchun bogʻlaning.','Explore the menu, find your favourites and get in touch to plan your visit.','Мәзірді қарап, сүйікті тағамдарыңызды таңдап, келу үшін хабарласыңыз.','Менюну көрүп, сүйүктүү тамактарыңызды тандап, келүү үчүн байланышыңыз.','Менюро бинед, таомҳои дӯстдоштаатонро интихоб кунед ва барои ташриф тамос гиред.'],
tagline:['Хорошая еда объединяет.\nОстальное подождёт.','Yaxshi taom birlashtiradi.\nQolgani kutadi.','Good food brings us together.\nEverything else can wait.','Жақсы ас біріктіреді.\nҚалғаны күте тұрады.','Жакшы тамак бириктирет.\nКалганы күтө турсун.','Таоми хуб моро муттаҳид мекунад.\nБоқимонда интизор мешавад.'],
example:['Пример блюда. Замените своими данными и фотографией.','Namuna taom. Maʼlumot va suratni almashtiring.','Sample dish. Replace with your own information and photograph.','Үлгі тағам. Деректер мен фотоны ауыстырыңыз.','Үлгү тамак. Маалымат жана сүрөттү алмаштырыңыз.','Таоми намунавӣ. Маълумот ва аксро иваз кунед.'],
} as const;
export function restaurantText(language:Language,key:keyof typeof labels):string{return labels[key][({ru:0,uz:1,en:2,kk:3,ky:4,tg:5})[language]]}
export function filterMenu(items:Spec['items'],query:string,category:string,diet:string){const q=query.trim().toLocaleLowerCase();return items.filter(i=>(!category||i.category.trim()===category)&&(!diet||i.tags?.includes(diet as 'vegetarian'|'spicy'|'featured'))&&(!q||[i.title,i.description,i.meta2].some(v=>v.toLocaleLowerCase().includes(q))))}
export function reservationMessage(s:Spec,values:{name:string;phone:string;date:string;time:string;guests:string;note:string}){const t=(k:keyof typeof labels)=>restaurantText(s.language,k);return `${t('request')}: ${s.name}\n${t('name')}: ${values.name.trim()}\n${t('phone')}: ${values.phone.trim()}\n${t('date')}: ${values.date}\n${t('time')}: ${values.time}\n${t('guests')}: ${values.guests}${values.note.trim()?'\n'+t('note')+': '+values.note.trim():''}`}
export function restaurantTemplate(s:Spec):Spec {const t=(k:keyof typeof labels)=>restaurantText(s.language,k);const names:Record<Language,string[]>={ru:['Сезонный салат','Блюдо на огне','Десерт к чаю'],uz:['Mavsumiy salat','Olovda pishirilgan taom','Choy uchun shirinlik'],en:['Seasonal salad','From the grill','Something sweet'],kk:['Маусымдық салат','Отта піскен тағам','Шайға тәтті'],ky:['Мезгилдик салат','Отто бышкан тамак','Чайга таттуу'],tg:['Хӯриши мавсимӣ','Таом дар оташ','Ширинӣ барои чой']};return styleRestaurant({...s,headline:t('headline'),description:t('description'),cta:t('book'),tagline:t('tagline'),aboutTitle:t('about'),about:'',items:names[s.language].map((title,i)=>({id:'example-dish-'+i,title,description:t('example'),category:({ru:['Салаты','На огне','Десерты'],uz:['Salatlar','Olovda','Shirinliklar'],en:['Salads','From the grill','Desserts'],kk:['Салаттар','Отта','Десерттер'],ky:['Салаттар','Отто','Десерттер'],tg:['Хӯришҳо','Дар оташ','Шириниҳо']})[s.language][i],images:i===1?[{src:'/images/dish.webp',alt:t('stock'),x:50,y:50,fit:'cover'}]:[],meta1:'',meta2:'',meta3:'',available:true,tags:i===1?['featured']:[]}))},t('stock'),t('example'))}
