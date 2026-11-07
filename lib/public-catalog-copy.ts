import type {Template} from './template-catalog';import {uiText,type PublicLanguage} from './public-i18n';
export const catalogDescriptions={
  "hostel": [
    "Xonalar, yashash shartlari va suratlarni ko‘ring. Kerakli sanalarga so‘rov yuboring.",
    "Бөлмелерді, тұру шарттары мен фотосуреттерді қараңыз. Қажетті күндерге өтінім жіберіңіз.",
    "Explore rooms, photos and stay information. Send a request for your chosen dates.",
    "Ҳуҷраҳо, шартҳои иқомат ва аксҳоро бинед. Барои санаҳои лозима дархост фиристед."
  ],
  "restaurant": [
    "Menyu bilan tanishing. Taomlar, ish vaqti va stol band qilish shartlarini aniqlang.",
    "Мәзірмен танысыңыз. Тағамдарды, жұмыс уақытын және үстел брондау шарттарын нақтылаңыз.",
    "Explore the menu. Ask about dishes, opening hours and table booking terms.",
    "Бо меню шинос шавед. Таомҳо, соатҳои корӣ ва шартҳои брон кардани мизро пурсед."
  ],
  "nails": [
    "Shakl, rang va dizaynni tanlang. Xizmatlar va bo‘sh vaqtni mutaxassis bilan kelishing.",
    "Пішін, түс пен дизайнды таңдаңыз. Қызметтер мен бос уақытты маманмен келісіңіз.",
    "Choose your shape, colour and design. Discuss available treatments and appointment times.",
    "Шакл, ранг ва тарҳро интихоб кунед. Хизматҳо ва вақти холиро бо мутахассис мувофиқа кунед."
  ],
  "construction": [
    "Obyekt, kerakli natija va muddatlarni muhokama qiling. Ish hajmi va dastlabki hisobni aniqlang.",
    "Нысанды, күткен нәтижені және мерзімдерді талқылаңыз. Жұмыс көлемі мен алдын ала есепті нақтылаңыз.",
    "Discuss your project, goals and timing. Clarify the scope and preliminary estimate.",
    "Объект, натиҷаи дилхоҳ ва муҳлатҳоро муҳокима кунед. Ҳаҷми кор ва ҳисоби аввалияро муайян кунед."
  ],
  "dentistry": [
    "Qabul yo‘nalishlari va tayyorgarlik haqida bilib oling. Kerakli muolajalarni mutaxassis bilan muhokama qiling.",
    "Қабылдау бағыттары мен дайындық туралы біліңіз. Қажетті емшараларды маманмен талқылаңыз.",
    "Explore treatment areas and visit preparation. Discuss suitable care with a specialist.",
    "Самтҳои қабул ва омодагӣ ба ташрифро омӯзед. Муолиҷаи мувофиқро бо мутахассис муҳокима кунед."
  ],
  "retail": [
    "Mahsulotlarni ko‘ring. Mavjudligi, narxlari va xarid shartlarini aniqlang.",
    "Тауарларды қараңыз. Қолжетімділікті, бағаларды және сатып алу шарттарын нақтылаңыз.",
    "Browse products. Ask about availability, prices and purchase terms.",
    "Молҳоро бинед. Мавҷудият, нархҳо ва шартҳои харидро пурсед."
  ],
  "school": [
    "O‘quv yo‘nalishini tanlang. Dastur, dars shakli va jadvalni aniqlang.",
    "Оқу бағытын таңдаңыз. Бағдарламаны, сабақ түрін және кестені нақтылаңыз.",
    "Find a learning programme. Ask about course content, class formats and schedules.",
    "Самти таълимро интихоб кунед. Барнома, шакли дарс ва ҷадвалро пурсед."
  ],
  "legal": [
    "Savolingizni qisqacha yozing. Maslahat uchun kerakli hujjat va maʼlumotlarni aniqlang.",
    "Сұрағыңызды қысқаша сипаттаңыз. Кеңеске қажетті құжаттар мен деректерді нақтылаңыз.",
    "Describe your legal question. Find out which documents and information are needed for a consultation.",
    "Саволи ҳуқуқии худро кӯтоҳ шарҳ диҳед. Ҳуҷҷатҳо ва маълумоти лозим барои машваратро муайян кунед."
  ],
  "beauty": [
    "Istagan qiyofangizni muhokama qiling. Xizmatlar, mutaxassislar va tashrif vaqtini tanlang.",
    "Қалаған бейнеңізді талқылаңыз. Қызметтерді, мамандарды және келу уақытын таңдаңыз.",
    "Discuss your desired look. Explore services, specialists and appointment times.",
    "Симои дилхоҳро муҳокима кунед. Хизматҳо, мутахассисон ва вақти ташрифро интихоб кунед."
  ],
  "medical": [
    "Qabul yo‘nalishlari va tashrifga tayyorgarlik bilan tanishing. Sayt shifokor maslahatini almashtirmaydi.",
    "Қабылдау бағыттары мен дайындық туралы біліңіз. Сайт дәрігер кеңесін алмастырмайды.",
    "Explore care services and visit preparation. This website does not replace medical advice.",
    "Самтҳои қабул ва омодагӣ ба ташрифро бинед. Сомона машварати духтурро иваз намекунад."
  ],
  "kindergarten": [
    "Bolalar maskani bilan tanishing. Yosh, kun tartibi va guruhga qo‘shilish shartlarini muhokama qiling.",
    "Балалар орталығымен танысыңыз. Жасты, күн тәртібін және топқа қосылу шарттарын талқылаңыз.",
    "Explore the children's space. Discuss ages, daily routines and joining a group.",
    "Бо фазои кӯдакон шинос шавед. Синну сол, реҷаи рӯз ва шартҳои шиносоӣ бо гурӯҳро муҳокима кунед."
  ],
  "accounting": [
    "Kompaniya faoliyati va hisob vazifalarini ayting. Xizmat hajmi hamda kerakli hujjatlarni aniqlang.",
    "Компания қызметі мен есеп міндеттерін сипаттаңыз. Қызмет көлемі мен қажетті құжаттарды нақтылаңыз.",
    "Describe your business and accounting needs. Discuss the scope of support and required documents.",
    "Фаъолияти ширкат ва вазифаҳои муҳосибиро шарҳ диҳед. Ҳаҷми хизмат ва ҳуҷҷатҳои лозимро муайян кунед."
  ],
  "plumbing": [
    "Makon uchun santexnika tanlang. Mahsulotlar, o‘lchamlar va buyurtma tafsilotlarini muhokama qiling.",
    "Кеңістігіңізге сантехника таңдаңыз. Тауарларды, өлшемдерді және тапсырыс мәліметтерін талқылаңыз.",
    "Choose plumbing products for your space. Discuss dimensions, availability and order details.",
    "Барои фазои худ сантехника интихоб кунед. Молҳо, андозаҳо ва ҷузъиёти фармоишро муҳокима кунед."
  ],
  "wedding": [
    "To‘y g‘oyangizni ayting. Taklifnoma, bezak va individual buyurtmani muhokama qiling.",
    "Той идеяңызды айтыңыз. Шақыруларды, безендіруді және жеке тапсырысты талқылаңыз.",
    "Share your wedding ideas. Discuss invitations, event design and custom requests.",
    "Ғояи тӯятонро бигӯед. Даъватномаҳо, ороиш ва фармоиши инфиродиро муҳокима кунед."
  ],
  "fitness": [
    "Maqsad va tayyorgarlik darajangizni ayting. Mashg‘ulotlar va jadvalni aniqlang.",
    "Мақсатыңыз бен дайындық деңгейіңізді айтыңыз. Жаттығулар мен кестені нақтылаңыз.",
    "Share your goals and experience. Explore training options and schedules.",
    "Ҳадаф ва сатҳи омодагии худро бигӯед. Машқҳо ва ҷадвалро муайян кунед."
  ],
  "realestate": [
    "Uy yoki joy variantlarini ko‘ring. Talablar, shartlar va ko‘rish vaqtini muhokama qiling.",
    "Тұрғын үй немесе кеңістік нұсқаларын қараңыз. Талаптарды, шарттарды және көру уақытын талқылаңыз.",
    "Browse property options. Discuss your needs, terms and viewing times.",
    "Имкониятҳои манзил ва фазоро бинед. Талабот, шартҳо ва вақти боздидро муҳокима кунед."
  ],
  "auto": [
    "Avtomobil va muammoni ayting. Ishlar, ehtiyot qismlar va tashrif vaqtini aniqlang.",
    "Көлік пен мәселені сипаттаңыз. Жұмыстарды, бөлшектерді және келу уақытын нақтылаңыз.",
    "Describe your vehicle and the issue. Discuss services, parts and visit times.",
    "Мошин ва мушкилро шарҳ диҳед. Корҳо, қисмҳо ва вақти ташрифро муайян кунед."
  ],
  "cleaning": [
    "Joy turi va tozalash vazifasini ayting. Ish hajmi, vaqt va shartlarni kelishing.",
    "Кеңістік түрі мен тазалау міндетін айтыңыз. Жұмыс көлемін, уақытты және шарттарды келісіңіз.",
    "Describe your space and cleaning needs. Agree on the scope, timing and terms.",
    "Навъи ҷой ва ниёзи тозакуниро бигӯед. Ҳаҷми кор, вақт ва шартҳоро мувофиқа кунед."
  ],
  "it": [
    "Raqamli mahsulot g‘oyangizni ayting. Funksiyalar, ish bosqichlari va muddatlarni muhokama qiling.",
    "Цифрлық өнім идеяңызды айтыңыз. Мүмкіндіктерді, кезеңдерді және мерзімдерді талқылаңыз.",
    "Describe your digital product. Discuss features, project stages and timing.",
    "Ғояи маҳсулоти рақамиро бигӯед. Имкониятҳо, марҳилаҳо ва муҳлатҳоро муҳокима кунед."
  ],
  "logistics": [
    "Yuk, manzil va muddatlarni ayting. Yetkazib berish shakli va shartlarini aniqlang.",
    "Жүкті, бағытты және мерзімдерді сипаттаңыз. Жеткізу түрі мен шарттарын нақтылаңыз.",
    "Describe the shipment, destination and timing. Discuss delivery options and terms.",
    "Бор, манзил ва муҳлатҳоро бигӯед. Тарзи расонидан ва шартҳоро муайян кунед."
  ],
  "travel": [
    "Manzil va sayohat turini tanlang. Dastur, sanalar va qatnashish shartlarini aniqlang.",
    "Бағыт пен саяхат түрін таңдаңыз. Бағдарламаны, күндерді және қатысу шарттарын нақтылаңыз.",
    "Choose a destination and travel style. Ask about itineraries, dates and participation terms.",
    "Самт ва навъи саёҳатро интихоб кунед. Барнома, санаҳо ва шартҳои иштирокро пурсед."
  ],
  "photography": [
    "Surat va videolarni ko‘ring. Tasvirga olish turi, sana va tayyorgarlikni muhokama qiling.",
    "Фото мен бейнелерді қараңыз. Түсірілім түрін, күнін және дайындықты талқылаңыз.",
    "Explore photos and videos. Discuss the shoot format, date and preparation.",
    "Аксҳо ва видеоҳоро бинед. Навъи наворбардорӣ, сана ва омодагиро муҳокима кунед."
  ],
  "furniture": [
    "Mebel va interyer namunalarini ko‘ring. O‘lchamlar, materiallar va buyurtma shartlarini aniqlang.",
    "Жиһаз бен интерьер үлгілерін қараңыз. Өлшемдерді, материалдарды және тапсырыс шарттарын нақтылаңыз.",
    "Explore furniture and interior examples. Discuss dimensions, materials and order terms.",
    "Намунаҳои мебел ва ороиши дохилиро бинед. Андозаҳо, мавод ва шартҳои фармоишро муайян кунед."
  ],
  "repair": [
    "Texnika va nosozlikni ayting. Tekshiruv, taʼmirlash va topshirish shartlarini aniqlang.",
    "Құрылғы мен ақауды сипаттаңыз. Тексеру, жөндеу және тапсыру шарттарын нақтылаңыз.",
    "Describe your device and the fault. Ask about inspection, repairs and handover terms.",
    "Таҷҳизот ва нуқсонро шарҳ диҳед. Санҷиш, таъмир ва шартҳои супориданро муайян кунед."
  ],
  "generic": [
    "Faoliyat, xizmatlar va aloqani taqdim eting. Vazifa va keyingi qadamni mijoz bilan muhokama qiling.",
    "Қызметіңізді, ұсыныстарды және байланысты көрсетіңіз. Міндет пен келесі қадамды клиентпен талқылаңыз.",
    "Present your business, services and contacts. Discuss customer needs and the next step.",
    "Фаъолият, хизматҳо ва тамосро пешниҳод кунед. Вазифа ва қадами навбатиро бо муштарӣ муҳокима кунед."
  ]
} as const;
export function templateDescription(template:Template,language:PublicLanguage){if(template.pageType==='contact-card')return uiText(language,'Телефоны, сайт и социальные сети. Фото внизу, QR-код и свой цвет.');if(language==='ru')return template.description;const index=language==='uz'?0:language==='kk'?1:language==='en'?2:3;if(template.restaurantStyle==='fastfood')return ['Fastfud: burgerlar, pitsa va sevimli gazaklar.','Фастфуд: бургерлер, пицца және сүйікті тіскебасарлар.','Fast food: burgers, pizza and favourite snacks.','Таомҳои зудтайёр: бургер, питса ва газакҳои дӯстдошта.'][index];if(template.restaurantStyle==='japanese')return ['Yapon taomlari: ixcham menyu va detallarga eʼtibor.','Жапон тағамдары: ықшам мәзір және бөлшектерге назар.','Japanese cuisine: a concise menu with attention to detail.','Таомҳои ҷопонӣ: менюи мухтасар ва таваҷҷуҳ ба ҷузъиёт.'][index];return catalogDescriptions[template.niche][index]}
