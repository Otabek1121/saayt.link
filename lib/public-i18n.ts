export const publicLanguages=[{code:'uz',label:'O‘zbekcha'},{code:'kk',label:'Қазақша'},{code:'ru',label:'Русский'},{code:'en',label:'English'},{code:'tg',label:'Тоҷикӣ'}] as const;
export type PublicLanguage=typeof publicLanguages[number]['code'];
export const LANGUAGE_COOKIE='saayt-language';
export function publicLanguage(value:unknown):PublicLanguage|null{return typeof value==='string'&&publicLanguages.some(l=>l.code===value)?value as PublicLanguage:null}
export function languageUrl(path:string,language:PublicLanguage){const u=new URL(path,'https://saayt.link');if(u.origin!=='https://saayt.link')return path;u.searchParams.set('lang',language);return u.pathname+u.search+u.hash}
export const publicTranslations:Record<string,readonly [string,string,string,string]>={
  "К содержимому": [
    "Asosiy mazmunga",
    "Мазмұнға өту",
    "Skip to content",
    "Ба муҳтаво гузаштан"
  ],
  "Навигация Saayt.link": [
    "Saayt.link menyusi",
    "Saayt.link мәзірі",
    "Saayt.link navigation",
    "Роҳнамоии Saayt.link"
  ],
  "Что входит": [
    "Nimalar kiradi",
    "Не кіреді",
    "What's included",
    "Чӣ дохил мешавад"
  ],
  "Шаблоны": [
    "Shablonlar",
    "Үлгілер",
    "Templates",
    "Қолабҳо"
  ],
  "Кабинет ↗": [
    "Kabinet ↗",
    "Жеке кабинет ↗",
    "Dashboard ↗",
    "Кабинет ↗"
  ],
  "Кабинет": [
    "Kabinet",
    "Жеке кабинет",
    "Dashboard",
    "Кабинет"
  ],
  "Saayt.link · сайты для бизнеса": [
    "Saayt.link · biznes uchun saytlar",
    "Saayt.link · бизнеске арналған сайттар",
    "Saayt.link · websites for business",
    "Saayt.link · сомонаҳо барои тиҷорат"
  ],
  "Ваш бизнес.": [
    "Biznesingiz.",
    "Сіздің бизнесіңіз.",
    "Your business.",
    "Тиҷорати шумо."
  ],
  "Ваш сайт.": [
    "Saytingiz.",
    "Сіздің сайтыңыз.",
    "Your website.",
    "Сомонаи шумо."
  ],
  "Одна ссылка.": [
    "Bitta havola.",
    "Бір сілтеме.",
    "One link.",
    "Як пайванд."
  ],
  "Создадим сайт для вашего дела. Вы сможете сами менять фотографии, цены и контакты, а заявки клиентов получать в кабинете и Telegram.": [
    "Biznesingiz uchun sayt yaratamiz. Suratlar, narxlar va aloqa maʼlumotlarini o‘zingiz o‘zgartirasiz. Mijozlar so‘rovlari kabinet va Telegramga keladi.",
    "Бизнесіңізге сайт жасаймыз. Фотосуреттерді, бағаларды және байланыс деректерін өзіңіз өзгертесіз. Клиент өтінімдері кабинет пен Telegram арқылы келеді.",
    "We build a website for your business. Update photos, prices and contact details yourself, and receive customer requests in your dashboard and Telegram.",
    "Барои тиҷорати шумо сомона месозем. Аксҳо, нархҳо ва маълумоти тамосро худатон иваз мекунед. Дархостҳои муштариён ба кабинет ва Telegram меоянд."
  ],
  "Заказать готовый сайт ↗": [
    "Tayyor sayt buyurtma qilish ↗",
    "Дайын сайтқа тапсырыс беру ↗",
    "Order a ready website ↗",
    "Фармоиши сомонаи тайёр ↗"
  ],
  "Стоимость согласуем до начала работы.": [
    "Narxni ish boshlanishidan oldin kelishamiz.",
    "Бағаны жұмыс басталғанға дейін келісеміз.",
    "We agree on the price before work begins.",
    "Нархро пеш аз оғози кор мувофиқа мекунем."
  ],
  "Сначала посмотреть шаблоны": [
    "Avval shablonlarni ko‘rish",
    "Алдымен үлгілерді көру",
    "Browse templates first",
    "Аввал дидани қолабҳо"
  ],
  "Пример фотографии блюда для меню ресторана": [
    "Restoran menyusi uchun taom surati namunasi",
    "Мейрамхана мәзіріне арналған тағам суретінің үлгісі",
    "Example food photo for a restaurant menu",
    "Намунаи акси таом барои менюи тарабхона"
  ],
  "ПРИМЕР САЙТА РЕСТОРАНА": [
    "RESTORAN SAYTI NAMUNASI",
    "МЕЙРАМХАНА САЙТЫНЫҢ ҮЛГІСІ",
    "RESTAURANT WEBSITE EXAMPLE",
    "НАМУНАИ СОМОНАИ ТАРАБХОНА"
  ],
  "Гость выбирает блюдо.": [
    "Mehmon taom tanlaydi.",
    "Қонақ тағам таңдайды.",
    "Your guest chooses a dish.",
    "Меҳмон таом интихоб мекунад."
  ],
  "Вы получаете заявку.": [
    "Sizga so‘rov keladi.",
    "Сіз өтінім аласыз.",
    "You receive a request.",
    "Шумо дархост мегиред."
  ],
  "Открыть примеры ↗": [
    "Namunalarni ko‘rish ↗",
    "Мысалдарды ашу ↗",
    "View examples ↗",
    "Дидани намунаҳо ↗"
  ],
  "ВЫБЕРИТЕ ЗАДАЧУ": [
    "VAZIFANI TANLANG",
    "МАҚСАТТЫ ТАҢДАҢЫЗ",
    "CHOOSE YOUR GOAL",
    "ВАЗИФАРО ИНТИХОБ КУНЕД"
  ],
  "Сайт под ваше дело": [
    "Biznesingizga mos sayt",
    "Бизнесіңізге лайық сайт",
    "A website for your business",
    "Сомона барои тиҷорати шумо"
  ],
  "Во всех вариантах: мобильная версия, редактирование содержания и отдельный кабинет клиента.": [
    "Barcha variantlarda: mobil ko‘rinish, mazmunni tahrirlash va mijoz uchun alohida kabinet.",
    "Барлық нұсқада: мобильді нұсқа, мазмұнды өңдеу және клиенттің жеке кабинеті.",
    "Every option includes a mobile layout, editable content and a separate client dashboard.",
    "Дар ҳамаи вариантҳо: намуди мобилӣ, таҳрири муҳтаво ва кабинети алоҳидаи муштарӣ."
  ],
  "Меню и заказы": [
    "Menyu va buyurtmalar",
    "Мәзір және тапсырыстар",
    "Menu and orders",
    "Меню ва фармоишҳо"
  ],
  "Для кафе и ресторанов": [
    "Kafe va restoranlar uchun",
    "Кафелер мен мейрамханаларға",
    "For cafés and restaurants",
    "Барои қаҳвахонаҳо ва тарабхонаҳо"
  ],
  "Блюда, фотографии и цены": [
    "Taomlar, suratlar va narxlar",
    "Тағамдар, фотосуреттер және бағалар",
    "Dishes, photos and prices",
    "Таомҳо, аксҳо ва нархҳо"
  ],
  "Заявки на заказ и столик": [
    "Buyurtma va stol band qilish so‘rovlari",
    "Тапсырыс пен үстел брондау өтінімдері",
    "Order and table requests",
    "Дархостҳои фармоиш ва брон кардани миз"
  ],
  "Ссылка для гостей и QR код": [
    "Mehmonlar uchun havola va QR kod",
    "Қонақтарға сілтеме және QR код",
    "Guest link and QR code",
    "Пайванд барои меҳмонон ва рамзи QR"
  ],
  "Номера и бронирования": [
    "Xonalar va band qilish",
    "Бөлмелер және брондау",
    "Rooms and booking requests",
    "Ҳуҷраҳо ва бронкунӣ"
  ],
  "Для гостиниц и гостевых домов": [
    "Mehmonxona va mehmon uylari uchun",
    "Қонақүйлер мен шағын қонақ үйлеріне",
    "For hotels and guesthouses",
    "Барои меҳмонхонаҳо ва хонаҳои меҳмонӣ"
  ],
  "Номера, условия и фотографии": [
    "Xonalar, shartlar va suratlar",
    "Бөлмелер, шарттар және фотосуреттер",
    "Rooms, terms and photos",
    "Ҳуҷраҳо, шартҳо ва аксҳо"
  ],
  "Заявки с датами проживания": [
    "Yashash sanalari ko‘rsatilgan so‘rovlar",
    "Тұру күндері көрсетілген өтінімдер",
    "Requests with stay dates",
    "Дархостҳо бо санаҳои иқомат"
  ],
  "Контакты и расположение": [
    "Aloqa va joylashuv",
    "Байланыс және орналасуы",
    "Contact details and location",
    "Тамос ва ҷойгиршавӣ"
  ],
  "Услуги и запись": [
    "Xizmatlar va yozilish",
    "Қызметтер және жазылу",
    "Services and appointments",
    "Хизматҳо ва сабти қабул"
  ],
  "Для салонов, специалистов и компаний": [
    "Salonlar, mutaxassislar va kompaniyalar uchun",
    "Салондар, мамандар және компанияларға",
    "For salons, specialists and businesses",
    "Барои салонҳо, мутахассисон ва ширкатҳо"
  ],
  "Услуги, специалисты и цены": [
    "Xizmatlar, mutaxassislar va narxlar",
    "Қызметтер, мамандар және бағалар",
    "Services, specialists and prices",
    "Хизматҳо, мутахассисон ва нархҳо"
  ],
  "Заявки на выбранную дату": [
    "Tanlangan sanaga so‘rovlar",
    "Таңдалған күнге өтінімдер",
    "Requests for a chosen date",
    "Дархостҳо барои санаи интихобшуда"
  ],
  "Галерея работ и контакты": [
    "Ishlar galereyasi va aloqa",
    "Жұмыстар галереясы және байланыс",
    "Work gallery and contacts",
    "Намунаи корҳо ва тамос"
  ],
  "Стоимость после уточнения задачи": [
    "Narx vazifa aniqlangach belgilanadi",
    "Баға міндет нақтыланғаннан кейін",
    "Price after discussing your needs",
    "Нарх пас аз муайян кардани вазифа"
  ],
  "Получить расчёт ↗": [
    "Narx hisobini olish ↗",
    "Баға есебін алу ↗",
    "Request a quote ↗",
    "Гирифтани ҳисоб ↗"
  ],
  "От данных до готовой ссылки": [
    "Maʼlumotlardan tayyor havolagacha",
    "Деректерден дайын сілтемеге дейін",
    "From your details to a ready link",
    "Аз маълумот то пайванди тайёр"
  ],
  "Выберите пример": [
    "Namuna tanlang",
    "Үлгіні таңдаңыз",
    "Choose an example",
    "Намуна интихоб кунед"
  ],
  "Посмотрите шаблоны и расскажите, что нужно вашему бизнесу.": [
    "Shablonlarni ko‘ring va biznesingizga nima kerakligini ayting.",
    "Үлгілерді қарап, бизнесіңізге не қажет екенін айтыңыз.",
    "Browse templates and tell us what your business needs.",
    "Қолабҳоро бинед ва ниёзҳои тиҷорататонро бигӯед."
  ],
  "Передайте содержание": [
    "Mazmunni yuboring",
    "Мазмұнды жіберіңіз",
    "Send your content",
    "Муҳтаворо фиристед"
  ],
  "Добавим ваши фотографии, меню или услуги. Проверим контакты и мобильную версию.": [
    "Suratlaringiz, menyu yoki xizmatlaringizni qo‘shamiz. Aloqa maʼlumotlari va mobil ko‘rinishni tekshiramiz.",
    "Фотосуреттеріңізді, мәзірді немесе қызметтерді қосамыз. Байланыс деректері мен мобильді нұсқаны тексереміз.",
    "We add your photos, menu or services, then check contact details and the mobile layout.",
    "Аксҳо, меню ё хизматҳои шуморо илова мекунем. Тамос ва намуди мобилиро месанҷем."
  ],
  "Получите сайт и кабинет": [
    "Sayt va kabinetni oling",
    "Сайт пен кабинетке қол жеткізіңіз",
    "Get your website and dashboard",
    "Сомона ва кабинетро гиред"
  ],
  "После согласования опубликуем сайт. Вы получите доступ для редактирования и инструкцию подключения Telegram.": [
    "Kelishuvdan so‘ng saytni eʼlon qilamiz. Tahrirlash huquqi va Telegramni ulash yo‘riqnomasini olasiz.",
    "Келісілгеннен кейін сайтты жариялаймыз. Өңдеуге қолжетімділік пен Telegram қосу нұсқаулығын аласыз.",
    "After approval, we publish your site. You receive editing access and instructions for connecting Telegram.",
    "Пас аз мувофиқа сомонаро нашр мекунем. Шумо дастрасии таҳрир ва дастури пайваст кардани Telegram мегиред."
  ],
  "ПОСЛЕ ЗАПУСКА": [
    "ISHGA TUSHGANDAN SO‘NG",
    "ІСКЕ ҚОСЫЛҒАННАН КЕЙІН",
    "AFTER LAUNCH",
    "ПАС АЗ ОҒОЗ"
  ],
  "Меняйте содержание сами": [
    "Mazmunni o‘zingiz o‘zgartiring",
    "Мазмұнды өзіңіз өзгертіңіз",
    "Update content yourself",
    "Муҳтаворо худатон иваз кунед"
  ],
  "Новое блюдо, другая цена или номер телефона: внесите изменения, проверьте предпросмотр и опубликуйте. Черновик сохраняется отдельно от сайта для посетителей.": [
    "Yangi taom, narx yoki telefon raqami: o‘zgartiring, oldindan ko‘ring va eʼlon qiling. Qoralama tashrif buyuruvchilar ko‘radigan saytdan alohida saqlanadi.",
    "Жаңа тағам, баға немесе телефон нөмірі: өзгертіп, алдын ала қарап, жариялаңыз. Жоба нұсқасы келушілер көретін сайттан бөлек сақталады.",
    "A new dish, price or phone number: make the change, preview it and publish. Your draft is saved separately from the website visitors see.",
    "Таом, нарх ё рақами нав: тағйир диҳед, пешнамоишро санҷед ва нашр кунед. Пешнавис аз сомонаи барои меҳмонон намоён алоҳида нигоҳ дошта мешавад."
  ],
  "Открыть кабинет ↗": [
    "Kabinetni ochish ↗",
    "Кабинетті ашу ↗",
    "Open dashboard ↗",
    "Кушодани кабинет ↗"
  ],
  "Содержание меняется. Ваша ссылка остаётся.": [
    "Mazmun o‘zgaradi. Havolangiz o‘zgarmaydi.",
    "Мазмұн өзгереді. Сілтемеңіз сақталады.",
    "Your content changes. Your link stays.",
    "Муҳтаво иваз мешавад. Пайванди шумо мемонад."
  ],
  "Перед запуском": [
    "Ishga tushirishdan oldin",
    "Іске қосар алдында",
    "Before launch",
    "Пеш аз оғоз"
  ],
  "Кто будет менять содержание?": [
    "Mazmunni kim o‘zgartiradi?",
    "Мазмұнды кім өзгертеді?",
    "Who updates the content?",
    "Муҳтаворо кӣ иваз мекунад?"
  ],
  "Вы или ваш сотрудник. В кабинете можно менять название, фотографии, позиции, цены и контакты. Для клиента выдаётся отдельный логин и пароль с доступом только к его сайту.": [
    "Siz yoki xodimingiz. Kabinetda nom, suratlar, mahsulot va xizmatlar, narxlar hamda aloqani o‘zgartirish mumkin. Mijozga faqat o‘z saytiga kirish uchun alohida login va parol beriladi.",
    "Сіз немесе қызметкеріңіз. Кабинетте атауды, фотосуреттерді, ұсыныстарды, бағалар мен байланысты өзгертуге болады. Клиентке тек өз сайтына кіру үшін жеке логин мен құпиясөз беріледі.",
    "You or your employee. The dashboard lets you edit names, photos, listings, prices and contacts. Each client receives a separate login and password for their own site only.",
    "Шумо ё кормандатон. Дар кабинет ном, аксҳо, пешниҳодҳо, нархҳо ва тамосро иваз кардан мумкин аст. Муштарӣ логин ва пароли алоҳида мегирад, ки танҳо ба сомонаи худаш дастрасӣ медиҳанд."
  ],
  "Сколько стоит сайт?": [
    "Sayt qancha turadi?",
    "Сайт қанша тұрады?",
    "How much does a website cost?",
    "Сомона чанд пул аст?"
  ],
  "Стоимость зависит от направления, объёма наполнения и помощи с запуском. Отправьте заявку: состав работ и стоимость согласуем до начала.": [
    "Narx faoliyat turi, mazmun hajmi va ishga tushirishdagi yordamga bog‘liq. So‘rov yuboring: ish hajmi va narxni oldindan kelishamiz.",
    "Баға бағытқа, мазмұн көлеміне және іске қосу көмегіне байланысты. Өтінім жіберіңіз: жұмыс көлемі мен бағаны алдын ала келісеміз.",
    "The price depends on your business, content and launch support. Send a request and we will agree on the scope and cost before work begins.",
    "Нарх аз самт, ҳаҷми муҳтаво ва кӯмак дар оғоз вобаста аст. Дархост фиристед: ҳаҷми кор ва нархро пешакӣ мувофиқа мекунем."
  ],
  "Нужно ли покупать домен?": [
    "Domen sotib olish kerakmi?",
    "Домен сатып алу керек пе?",
    "Do I need to buy a domain?",
    "Оё домен харидан лозим аст?"
  ],
  "Можно начать со ссылки вида saayt.link/s/название. Подключение отдельного домена обсуждается отдельно.": [
    "saayt.link/s/nom kabi havoladan boshlash mumkin. Alohida domenni ulash alohida kelishiladi.",
    "saayt.link/s/atauy түріндегі сілтемеден бастауға болады. Жеке домен қосу бөлек талқыланады.",
    "You can start with a link such as saayt.link/s/name. A separate domain can be discussed individually.",
    "Метавонед аз пайванди монанди saayt.link/s/nom оғоз кунед. Пайваст кардани домени алоҳида ҷудогона муҳокима мешавад."
  ],
  "Куда приходят заявки?": [
    "So‘rovlar qayerga keladi?",
    "Өтінімдер қайда келеді?",
    "Where do requests arrive?",
    "Дархостҳо ба куҷо меоянд?"
  ],
  "Заявки сохраняются в кабинете. После подключения бота и нажатия Start уведомления отправляются в Telegram.": [
    "So‘rovlar kabinetda saqlanadi. Bot ulangach va Start bosilgach, bildirishnomalar Telegramga yuboriladi.",
    "Өтінімдер кабинетте сақталады. Ботты қосып, Start басқаннан кейін хабарламалар Telegram арқылы келеді.",
    "Requests are stored in the dashboard. After connecting the bot and pressing Start, notifications are sent to Telegram.",
    "Дархостҳо дар кабинет нигоҳ дошта мешаванд. Пас аз пайваст кардани бот ва пахши Start огоҳиҳо ба Telegram меоянд."
  ],
  "Запись и бронь подтверждаются автоматически?": [
    "Yozilish va band qilish avtomatik tasdiqlanadimi?",
    "Жазылу мен брондау автоматты растала ма?",
    "Are appointments and bookings confirmed automatically?",
    "Оё сабти қабул ва брон худкор тасдиқ мешаванд?"
  ],
  "Нет. Форма принимает заявку. Наличие блюда, свободный номер и время визита подтверждает ваш сотрудник. Онлайн оплата и автоматический календарь не подключены.": [
    "Yo‘q. Forma so‘rovni qabul qiladi. Taom mavjudligi, bo‘sh xona va tashrif vaqtini xodimingiz tasdiqlaydi. Onlayn to‘lov va avtomatik taqvim ulanmagan.",
    "Жоқ. Форма өтінімді қабылдайды. Тағамның барын, бос бөлмені және келу уақытын қызметкеріңіз растайды. Онлайн төлем мен автоматты күнтізбе қосылмаған.",
    "No. The form collects a request. Your employee confirms dish availability, a free room or a visit time. Online payments and an automatic calendar are not connected.",
    "Не. Шакл дархостро қабул мекунад. Мавҷудияти таом, ҳуҷраи холӣ ва вақти ташрифро корманди шумо тасдиқ мекунад. Пардохти онлайн ва тақвими худкор пайваст нашудаанд."
  ],
  "Можно ли сначала посмотреть шаблон?": [
    "Avval shablonni ko‘rish mumkinmi?",
    "Алдымен үлгіні көруге бола ма?",
    "Can I preview a template first?",
    "Метавонам аввал қолабро бинам?"
  ],
  "Да. Полный предпросмотр на компьютере и телефоне открыт без регистрации. Для сохранения своего сайта потребуется вход.": [
    "Ha. Kompyuter va telefon ko‘rinishini ro‘yxatdan o‘tmasdan ko‘rish mumkin. O‘z saytingizni saqlash uchun kirish kerak.",
    "Иә. Компьютер мен телефондағы толық алдын ала қарау тіркелусіз ашық. Өз сайтыңызды сақтау үшін кіру қажет.",
    "Yes. Full desktop and mobile previews are available without registration. Sign in to save your own website.",
    "Бале. Пешнамоиши пурра барои компютер ва телефон бе сабтином дастрас аст. Барои нигоҳ доштани сомонаи худ ворид шавед."
  ],
  "ОБСУДИМ ВАШ САЙТ": [
    "SAYTINGIZNI MUHOKAMA QILAMIZ",
    "САЙТЫҢЫЗДЫ ТАЛҚЫЛАЙЫҚ",
    "LET'S DISCUSS YOUR WEBSITE",
    "СОМОНАИ ШУМОРО МУҲОКИМА МЕКУНЕМ"
  ],
  "Получите расчёт": [
    "Narx hisobini oling",
    "Баға есебін алыңыз",
    "Get a quote",
    "Ҳисобро гиред"
  ],
  "под вашу задачу": [
    "vazifangiz uchun",
    "міндетіңізге сай",
    "for your needs",
    "барои вазифаи худ"
  ],
  "Оставьте контакт. Уточним содержание, объём работы и условия запуска.": [
    "Aloqangizni qoldiring. Mazmun, ish hajmi va ishga tushirish shartlarini aniqlaymiz.",
    "Байланысыңызды қалдырыңыз. Мазмұнды, жұмыс көлемін және іске қосу шарттарын нақтылаймыз.",
    "Leave your contact details. We will discuss the content, scope and launch terms.",
    "Маълумоти тамосро гузоред. Муҳтаво, ҳаҷми кор ва шартҳои оғозро муайян мекунем."
  ],
  "Не указывайте пароли и платёжные данные. Контакт используем для ответа на ваше обращение.": [
    "Parol va to‘lov maʼlumotlarini kiritmang. Aloqangizdan so‘rovingizga javob berish uchun foydalanamiz.",
    "Құпиясөздер мен төлем деректерін жазбаңыз. Байланысыңызды өтінішіңізге жауап беру үшін қолданамыз.",
    "Do not include passwords or payment details. We use your contact information to respond to your request.",
    "Парол ва маълумоти пардохтро нанависед. Тамосро барои ҷавоб ба муроҷиататон истифода мебарем."
  ],
  "Ваше имя": [
    "Ismingiz",
    "Атыңыз",
    "Your name",
    "Номи шумо"
  ],
  "Телефон или Telegram": [
    "Telefon yoki Telegram",
    "Телефон немесе Telegram",
    "Phone or Telegram",
    "Телефон ё Telegram"
  ],
  "+998 … или @username": [
    "+998 … yoki @username",
    "+998 … немесе @username",
    "+998 … or @username",
    "+998 … ё @username"
  ],
  "Чем занимается ваш бизнес?": [
    "Biznesingiz nima bilan shug‘ullanadi?",
    "Бизнесіңіз немен айналысады?",
    "What does your business do?",
    "Тиҷорати шумо ба чӣ машғул аст?"
  ],
  "Кафе, гостиница, салон…": [
    "Kafe, mehmonxona, salon…",
    "Кафе, қонақүй, салон…",
    "Café, hotel, salon…",
    "Қаҳвахона, меҳмонхона, салон…"
  ],
  "Какой сайт нужен?": [
    "Qanday sayt kerak?",
    "Қандай сайт қажет?",
    "What kind of website do you need?",
    "Чӣ гуна сомона лозим аст?"
  ],
  "Что важно учесть?": [
    "Nimani hisobga olish muhim?",
    "Нені ескеру маңызды?",
    "What should we consider?",
    "Чиро ба назар гирем?"
  ],
  "Заявка отправлена": [
    "So‘rov yuborildi",
    "Өтінім жіберілді",
    "Request sent",
    "Дархост фиристода шуд"
  ],
  "Отправляем…": [
    "Yuborilmoqda…",
    "Жіберілуде…",
    "Sending…",
    "Фиристода мешавад…"
  ],
  "Заявка сохранена.": [
    "So‘rov saqlandi.",
    "Өтінім сақталды.",
    "Request saved.",
    "Дархост нигоҳ дошта шуд."
  ],
  "Не удалось отправить заявку.": [
    "So‘rovni yuborib bo‘lmadi.",
    "Өтінімді жіберу мүмкін болмады.",
    "Could not send the request.",
    "Дархост фиристода нашуд."
  ],
  "Отправляя заявку, вы просите связаться с вами по указанному контакту.": [
    "So‘rov yuborish orqali ko‘rsatilgan aloqa bo‘yicha siz bilan bog‘lanishimizni so‘raysiz.",
    "Өтінімді жіберу арқылы көрсетілген байланыс бойынша хабарласуды сұрайсыз.",
    "By sending this request, you ask us to contact you using the details provided.",
    "Бо фиристодани дархост хоҳиш мекунед, ки бо маълумоти пешниҳодшуда бо шумо тамос гирем."
  ],
  "Как обрабатываются данные": [
    "Maʼlumotlar qanday ishlatiladi",
    "Деректер қалай өңделеді",
    "How data is handled",
    "Маълумот чӣ гуна коркард мешавад"
  ],
  "Ваш бизнес. Ваше содержание.": [
    "Biznesingiz. Mazmuningiz.",
    "Сіздің бизнесіңіз. Сіздің мазмұныңыз.",
    "Your business. Your content.",
    "Тиҷорати шумо. Муҳтавои шумо."
  ],
  "Конфиденциальность": [
    "Maxfiylik",
    "Құпиялылық",
    "Privacy",
    "Махфият"
  ],
  "Условия сервиса": [
    "Xizmat shartlari",
    "Сервис шарттары",
    "Service terms",
    "Шартҳои хизмат"
  ],
  "Попробуйте редактор": [
    "Tahrirlashni sinab ko‘ring",
    "Редакторды байқап көріңіз",
    "Try the editor",
    "Муҳаррирро санҷед"
  ],
  "ПОПРОБУЙТЕ САМИ": [
    "O‘ZINGIZ SINAB KO‘RING",
    "ӨЗІҢІЗ БАЙҚАП КӨРІҢІЗ",
    "TRY IT YOURSELF",
    "ХУДАТОН САНҶЕД"
  ],
  "Измените блюдо в примере": [
    "Namunadagi taomni o‘zgartiring",
    "Үлгідегі тағамды өзгертіңіз",
    "Edit the example dish",
    "Таоми намунаро иваз кунед"
  ],
  "Название блюда": [
    "Taom nomi",
    "Тағам атауы",
    "Dish name",
    "Номи таом"
  ],
  "Цена с валютой": [
    "Narx va valyuta",
    "Баға және валюта",
    "Price and currency",
    "Нарх ва асъор"
  ],
  "Введите свою цену": [
    "Narxingizni kiriting",
    "Бағаңызды енгізіңіз",
    "Enter your price",
    "Нархи худро ворид кунед"
  ],
  "Пример фотографии плова": [
    "Osh surati namunasi",
    "Палау суретінің үлгісі",
    "Example photo of plov",
    "Намунаи акси палав"
  ],
  "Плов": [
    "Osh",
    "Палау",
    "Plov",
    "Палав"
  ],
  "Здесь появится ваша цена": [
    "Narxingiz shu yerda ko‘rinadi",
    "Бағаңыз осында көрінеді",
    "Your price appears here",
    "Нархи шумо ин ҷо пайдо мешавад"
  ],
  "Это демонстрация. Изменения видны только вам и не публикуются.": [
    "Bu namuna. O‘zgarishlar faqat sizga ko‘rinadi va eʼlon qilinmaydi.",
    "Бұл көрсетілім. Өзгерістер тек сізге көрінеді және жарияланбайды.",
    "This is a demo. Changes are visible only to you and are not published.",
    "Ин намоиш аст. Тағйирот танҳо ба шумо намоён аст ва нашр намешавад."
  ],
  "Язык интерфейса": [
    "Interfeys tili",
    "Интерфейс тілі",
    "Interface language",
    "Забони интерфейс"
  ],
  "Свой сайт.": [
    "O‘z saytingiz.",
    "Өз сайтыңыз.",
    "Your own website.",
    "Сомонаи худ."
  ],
  "Для вашего дела.": [
    "Biznesingiz uchun.",
    "Бизнесіңіз үшін.",
    "For your business.",
    "Барои тиҷорати шумо."
  ],
  "Покажите блюда, номера или услуги. Добавьте фотографии и контакты, опубликуйте сайт и отправьте клиентам одну ссылку.": [
    "Taomlar, xonalar yoki xizmatlarni ko‘rsating. Suratlar va aloqani qo‘shing, saytni eʼlon qilib, mijozlarga bitta havola yuboring.",
    "Тағамдарды, бөлмелерді немесе қызметтерді көрсетіңіз. Фотосуреттер мен байланысты қосып, сайтты жариялап, клиенттерге бір сілтеме жіберіңіз.",
    "Show your dishes, rooms or services. Add photos and contacts, publish your website and send customers one link.",
    "Таомҳо, ҳуҷраҳо ё хизматҳоро нишон диҳед. Аксҳо ва тамосро илова карда, сомонаро нашр кунед ва ба муштариён як пайванд фиристед."
  ],
  "Выбрать шаблон": [
    "Shablon tanlash",
    "Үлгіні таңдау",
    "Choose a template",
    "Интихоби қолаб"
  ],
  "шаблонов": [
    "shablon",
    "үлгі",
    "templates",
    "қолаб"
  ],
  "направлений": [
    "yo‘nalish",
    "бағыт",
    "business types",
    "самт"
  ],
  "языков": [
    "til",
    "тіл",
    "languages",
    "забон"
  ],
  "Предпросмотр открыт без регистрации": [
    "Oldindan ko‘rish ro‘yxatdan o‘tmasdan ochiq",
    "Алдын ала қарау тіркелусіз ашық",
    "Preview without registration",
    "Пешнамоиш бе сабтином дастрас аст"
  ],
  "Подбор шаблона": [
    "Shablon tanlash",
    "Үлгі таңдау",
    "Template selection",
    "Интихоби қолаб"
  ],
  "Найдите свой шаблон": [
    "O‘zingizga mos shablonni toping",
    "Өзіңізге лайық үлгіні табыңыз",
    "Find your template",
    "Қолаби худро ёбед"
  ],
  "Выберите направление и посмотрите сайт целиком.": [
    "Yo‘nalishni tanlang va saytni to‘liq ko‘ring.",
    "Бағытты таңдап, сайтты толық қараңыз.",
    "Choose a business type and preview the full website.",
    "Самтро интихоб кунед ва сомонаро пурра бинед."
  ],
  "Импортировать свой шаблон ↑": [
    "Shabloningizni yuklash ↑",
    "Өз үлгіңізді жүктеу ↑",
    "Import your template ↑",
    "Ворид кардани қолаби худ ↑"
  ],
  "Войти в студию ↗": [
    "Studiyaga kirish ↗",
    "Студияға кіру ↗",
    "Open studio ↗",
    "Ворид шудан ба студия ↗"
  ],
  "Популярные направления": [
    "Ommabop yo‘nalishlar",
    "Танымал бағыттар",
    "Popular business types",
    "Самтҳои маъмул"
  ],
  "Все шаблоны": [
    "Barcha shablonlar",
    "Барлық үлгілер",
    "All templates",
    "Ҳамаи қолабҳо"
  ],
  "Рестораны": [
    "Restoranlar",
    "Мейрамханалар",
    "Restaurants",
    "Тарабхонаҳо"
  ],
  "Хостелы": [
    "Xostellar",
    "Хостелдер",
    "Hostels",
    "Хостелҳо"
  ],
  "Услуги": [
    "Xizmatlar",
    "Қызметтер",
    "Services",
    "Хизматҳо"
  ],
  "Язык создаваемого сайта": [
    "Yaratiladigan sayt tili",
    "Жасалатын сайт тілі",
    "New website language",
    "Забони сомонаи сохташаванда"
  ],
  "Поиск": [
    "Qidirish",
    "Іздеу",
    "Search",
    "Ҷустуҷӯ"
  ],
  "Ресторан, маникюр, адвокат…": [
    "Restoran, manikyur, advokat…",
    "Мейрамхана, маникюр, заңгер…",
    "Restaurant, manicure, lawyer…",
    "Тарабхона, маникюр, ҳуқуқшинос…"
  ],
  "Все фильтры и избранное": [
    "Barcha filtrlar va saralanganlar",
    "Барлық сүзгілер және таңдаулылар",
    "All filters and favourites",
    "Ҳамаи полоишҳо ва баргузидаҳо"
  ],
  "Направление": [
    "Yo‘nalish",
    "Бағыт",
    "Business type",
    "Самт"
  ],
  "Все": [
    "Barchasi",
    "Барлығы",
    "All",
    "Ҳама"
  ],
  "Все услуги": [
    "Barcha xizmatlar",
    "Барлық қызметтер",
    "All services",
    "Ҳамаи хизматҳо"
  ],
  "Оформление": [
    "Bezak",
    "Безендіру",
    "Design",
    "Тарҳ"
  ],
  "Все стили": [
    "Barcha uslublar",
    "Барлық стильдер",
    "All styles",
    "Ҳамаи услубҳо"
  ],
  "Минимализм": [
    "Minimalizm",
    "Минимализм",
    "Minimal",
    "Минимализм"
  ],
  "Мягкий": [
    "Yumshoq",
    "Жұмсақ",
    "Soft",
    "Нарм"
  ],
  "Архитектурный": [
    "Meʼmoriy",
    "Сәулеттік",
    "Architectural",
    "Меъморӣ"
  ],
  "Фотографический": [
    "Suratlarga asoslangan",
    "Фотографиялық",
    "Photo focused",
    "Аксмеҳвар"
  ],
  "Дизайны": [
    "Dizaynlar",
    "Дизайндар",
    "Designs",
    "Тарҳҳо"
  ],
  "Избранное": [
    "Saralanganlar",
    "Таңдаулылар",
    "Favourites",
    "Баргузидаҳо"
  ],
  "Порядок": [
    "Tartib",
    "Реті",
    "Sort order",
    "Тартиб"
  ],
  "По умолчанию": [
    "Odatiy",
    "Әдепкі",
    "Default",
    "Пешфарз"
  ],
  "По названию": [
    "Nomi bo‘yicha",
    "Атауы бойынша",
    "By name",
    "Аз рӯи ном"
  ],
  "По направлению": [
    "Yo‘nalish bo‘yicha",
    "Бағыты бойынша",
    "By business type",
    "Аз рӯи самт"
  ],
  "Ничего не найдено": [
    "Hech narsa topilmadi",
    "Ештеңе табылмады",
    "No results found",
    "Чизе ёфт нашуд"
  ],
  "Измените запрос или сбросьте фильтры.": [
    "So‘rovni o‘zgartiring yoki filtrlarni tozalang.",
    "Сұрауды өзгертіңіз немесе сүзгілерді тазалаңыз.",
    "Change your search or reset the filters.",
    "Ҷустуҷӯро иваз кунед ё полоишҳоро тоза кунед."
  ],
  "Сбросить фильтры": [
    "Filtrlarni tozalash",
    "Сүзгілерді тазалау",
    "Reset filters",
    "Тоза кардани полоишҳо"
  ],
  "Смотреть шаблон": [
    "Shablonni ko‘rish",
    "Үлгіні қарау",
    "Preview template",
    "Дидани қолаб"
  ],
  "Меню　Контакты": [
    "Menyu　Aloqa",
    "Мәзір　Байланыс",
    "Menu　Contact",
    "Меню　Тамос"
  ],
  "Связаться ↗": [
    "Bog‘lanish ↗",
    "Хабарласу ↗",
    "Get in touch ↗",
    "Тамос гирифтан ↗"
  ],
  "Предложения": [
    "Takliflar",
    "Ұсыныстар",
    "Offerings",
    "Пешниҳодҳо"
  ],
  "Смотреть страницу ↗": [
    "Sahifani ko‘rish ↗",
    "Бетті қарау ↗",
    "Preview page ↗",
    "Дидани саҳифа ↗"
  ],
  "Убрать из избранного": [
    "Saralanganlardan olib tashlash",
    "Таңдаулылардан алып тастау",
    "Remove from favourites",
    "Аз баргузидаҳо гирифтан"
  ],
  "В избранное": [
    "Saralanganlarga qo‘shish",
    "Таңдаулыларға қосу",
    "Add to favourites",
    "Ба баргузидаҳо илова кардан"
  ],
  "Смотреть": [
    "Ko‘rish",
    "Қарау",
    "Preview",
    "Дидан"
  ],
  "Использовать ↗": [
    "Foydalanish ↗",
    "Қолдану ↗",
    "Use template ↗",
    "Истифода бурдан ↗"
  ],
  "Показать ещё 12": [
    "Yana 12 tasini ko‘rsatish",
    "Тағы 12 үлгіні көрсету",
    "Show 12 more",
    "Нишон додани 12 қолаби дигар"
  ],
  "Показано": [
    "Ko‘rsatilgan",
    "Көрсетілді",
    "Showing",
    "Нишон дода шуд"
  ],
  "из": [
    "jami",
    "барлығы",
    "of",
    "аз"
  ],
  "Ваши идеи. Ваши клиенты. Одна ссылка, которая соединяет.": [
    "G‘oyalaringiz. Mijozlaringiz. Ularni birlashtiradigan bitta havola.",
    "Сіздің идеяларыңыз. Сіздің клиенттеріңіз. Оларды біріктіретін бір сілтеме.",
    "Your ideas. Your customers. One link that connects them.",
    "Ғояҳои шумо. Муштариёни шумо. Як пайванде, ки онҳоро мепайвандад."
  ],
  "Сначала — ваш бизнес. Потом — дизайн.": [
    "Avval biznesingiz. Keyin dizayn.",
    "Алдымен бизнесіңіз. Содан кейін дизайн.",
    "Your business first. Then the design.",
    "Аввал тиҷорати шумо. Сипас тарҳ."
  ],
  "Для ресторана — меню и блюда. Для магазина — товары и галерея. Для услуг — направления работы и обращение к специалисту. Всё редактируется в вашем кабинете.": [
    "Restoran uchun menyu va taomlar. Do‘kon uchun mahsulotlar va galereya. Xizmatlar uchun ish yo‘nalishlari va mutaxassisga murojaat. Barchasi kabinetda tahrirlanadi.",
    "Мейрамханаға мәзір мен тағамдар. Дүкенге тауарлар мен галерея. Қызметтерге жұмыс бағыттары мен маманға хабарласу. Барлығы кабинетте өңделеді.",
    "Menus and dishes for restaurants. Products and galleries for shops. Services and specialist enquiries for businesses. Edit it all in your dashboard.",
    "Барои тарабхона меню ва таомҳо. Барои мағоза молҳо ва аксҳо. Барои хизматрасонӣ самтҳои кор ва муроҷиат ба мутахассис. Ҳамааш дар кабинет таҳрир мешавад."
  ],
  "Уже работали в Saayt.link?": [
    "Saayt.link bilan ishlaganmisiz?",
    "Saayt.link қолдандыңыз ба?",
    "Already using Saayt.link?",
    "Қаблан бо Saayt.link кор кардаед?"
  ],
  "Откройте кабинет, чтобы изменить содержание своего сайта и посмотреть заявки клиентов.": [
    "Saytingiz mazmunini o‘zgartirish va mijozlar so‘rovlarini ko‘rish uchun kabinetni oching.",
    "Сайт мазмұнын өзгерту және клиент өтінімдерін көру үшін кабинетті ашыңыз.",
    "Open your dashboard to update your website and view customer requests.",
    "Барои иваз кардани муҳтавои сомона ва дидани дархостҳои муштариён кабинетро кушоед."
  ],
  "Загрузить файл Saayt.link": [
    "Saayt.link faylini yuklash",
    "Saayt.link файлын жүктеу",
    "Upload a Saayt.link file",
    "Бор кардани файли Saayt.link"
  ],
  "Полный просмотр шаблона": [
    "Shablonni to‘liq ko‘rish",
    "Үлгіні толық қарау",
    "Full template preview",
    "Пешнамоиши пурраи қолаб"
  ],
  "Предпросмотр страницы · фотографии для примера": [
    "Sahifa ko‘rinishi · namunaviy suratlar",
    "Бетті алдын ала қарау · үлгі фотосуреттер",
    "Page preview · example photos",
    "Пешнамоиши саҳифа · аксҳои намунавӣ"
  ],
  "Компьютер": [
    "Kompyuter",
    "Компьютер",
    "Desktop",
    "Компютер"
  ],
  "Телефон": [
    "Telefon",
    "Телефон",
    "Mobile",
    "Телефон"
  ],
  "Использовать шаблон ↗": [
    "Shablondan foydalanish ↗",
    "Үлгіні қолдану ↗",
    "Use this template ↗",
    "Истифодаи қолаб ↗"
  ],
  "Закрыть просмотр": [
    "Ko‘rishni yopish",
    "Қарауды жабу",
    "Close preview",
    "Пӯшидани пешнамоиш"
  ],
  "Загружаем предпросмотр…": [
    "Ko‘rinish yuklanmoqda…",
    "Алдын ала қарау жүктелуде…",
    "Loading preview…",
    "Пешнамоиш бор мешавад…"
  ],
  "Максимальный размер JSON — 256 КБ": [
    "JSON hajmi ko‘pi bilan 256 KB",
    "JSON өлшемі ең көбі 256 КБ",
    "Maximum JSON size is 256 KB",
    "Ҳаҷми JSON то 256 КБ аст"
  ],
  "Файл не удалось импортировать": [
    "Faylni yuklab bo‘lmadi",
    "Файлды импорттау мүмкін болмады",
    "Could not import the file",
    "Файл ворид нашуд"
  ],
  "Примеры сайтов Saayt.link": [
    "Saayt.link saytlari namunalari",
    "Saayt.link сайттарының үлгілері",
    "Saayt.link website examples",
    "Намунаҳои сомонаҳои Saayt.link"
  ],
  "Посмотреть пример сайта фастфуда": [
    "Fastfud sayti namunasini ko‘rish",
    "Фастфуд сайтының үлгісін қарау",
    "Preview a fast food website",
    "Дидани намунаи сомонаи таомҳои зудтайёр"
  ],
  "На ходу": [
    "Yo‘l ustida",
    "Жол үстінде",
    "On the go",
    "Дар роҳ"
  ],
  "Большой вкус.": [
    "Ajoyib taʼm.",
    "Керемет дәм.",
    "Big flavour.",
    "Лаззати бузург."
  ],
  "Твой ритм.": [
    "Sening maroming.",
    "Сенің ырғағың.",
    "Your rhythm.",
    "Мароми ту."
  ],
  "Бургер, пример фотографии для меню": [
    "Burger, menyu uchun surat namunasi",
    "Бургер, мәзірге арналған фото үлгісі",
    "Burger, example menu photo",
    "Бургер, намунаи акс барои меню"
  ],
  "Фастфуд · меню и контакты": [
    "Fastfud · menyu va aloqa",
    "Фастфуд · мәзір және байланыс",
    "Fast food · menu and contacts",
    "Таомҳои зудтайёр · меню ва тамос"
  ],
  "Посмотреть пример сайта хостела": [
    "Xostel sayti namunasini ko‘rish",
    "Хостел сайтының үлгісін қарау",
    "Preview a hostel website",
    "Дидани намунаи сомонаи хостел"
  ],
  "Пример фотографии хостела": [
    "Xostel surati namunasi",
    "Хостел фотосуретінің үлгісі",
    "Example hostel photo",
    "Намунаи акси хостел"
  ],
  "Точка отдыха": [
    "Dam olish joyi",
    "Демалыс орны",
    "Rest stop",
    "Ҷойи истироҳат"
  ],
  "Место для": [
    "Joy",
    "Орын",
    "A place for",
    "Ҷой барои"
  ],
  "новой истории": [
    "yangi hikoya uchun",
    "жаңа оқиғаға",
    "a new story",
    "қиссаи нав"
  ],
  "Хостел · номера и бронирование ↗": [
    "Xostel · xonalar va band qilish ↗",
    "Хостел · бөлмелер және брондау ↗",
    "Hostel · rooms and booking requests ↗",
    "Хостел · ҳуҷраҳо ва бронкунӣ ↗"
  ],
  "Ваше дело.": [
    "Biznesingiz.",
    "Сіздің бизнесіңіз.",
    "Your business.",
    "Тиҷорати шумо."
  ],
  "Заявка сохранена. Мы свяжемся по указанному контакту, чтобы уточнить задачу и стоимость.": [
    "So‘rov saqlandi. Vazifa va narxni aniqlash uchun ko‘rsatilgan aloqa orqali bog‘lanamiz.",
    "Өтінім сақталды. Міндет пен бағаны нақтылау үшін көрсетілген байланыс арқылы хабарласамыз.",
    "Request saved. We will contact you to discuss your needs and the price.",
    "Дархост нигоҳ дошта шуд. Барои муайян кардани вазифа ва нарх бо шумо тамос мегирем."
  ],
  "Укажите имя, контакт и направление бизнеса": [
    "Ism, aloqa va faoliyat yo‘nalishini kiriting",
    "Атыңызды, байланысыңызды және бизнес бағытын көрсетіңіз",
    "Enter your name, contact and business type",
    "Ном, тамос ва самти тиҷоратро ворид кунед"
  ],
  "Приём обращений временно недоступен": [
    "So‘rov qabul qilish vaqtincha ishlamayapti",
    "Өтініш қабылдау уақытша қолжетімсіз",
    "Requests are temporarily unavailable",
    "Қабули муроҷиатҳо муваққатан дастрас нест"
  ],
  "Обращения уже отправлены. Попробуйте позже.": [
    "So‘rovlar yuborilgan. Keyinroq urinib ko‘ring.",
    "Өтініштер жіберілген. Кейінірек көріңіз.",
    "Requests have already been sent. Please try later.",
    "Муроҷиатҳо аллакай фиристода шудаанд. Дертар кӯшиш кунед."
  ],
  "Не удалось отправить заявку. Попробуйте ещё раз.": [
    "So‘rovni yuborib bo‘lmadi. Qayta urinib ko‘ring.",
    "Өтінімді жіберу мүмкін болмады. Қайталап көріңіз.",
    "Could not send the request. Please try again.",
    "Дархост фиристода нашуд. Боз кӯшиш кунед."
  ],
  "Хостел и гостиница": [
    "Xostel va mehmonxona",
    "Хостел және қонақүй",
    "Hostel and hotel",
    "Хостел ва меҳмонхона"
  ],
  "Сантехника": [
    "Santexnika",
    "Сантехника",
    "Plumbing supplies",
    "Сантехника"
  ],
  "Ресторан и кафе": [
    "Restoran va kafe",
    "Мейрамхана және кафе",
    "Restaurant and café",
    "Тарабхона ва қаҳвахона"
  ],
  "Свадебные услуги": [
    "To‘y xizmatlari",
    "Үйлену тойы қызметтері",
    "Wedding services",
    "Хизматҳои тӯй"
  ],
  "Строительство и ремонт": [
    "Qurilish va taʼmirlash",
    "Құрылыс және жөндеу",
    "Construction and renovation",
    "Сохтмон ва таъмир"
  ],
  "Магазин": [
    "Do‘kon",
    "Дүкен",
    "Shop",
    "Мағоза"
  ],
  "Школа и учебный центр": [
    "Maktab va o‘quv markazi",
    "Мектеп және оқу орталығы",
    "School and learning centre",
    "Мактаб ва маркази таълимӣ"
  ],
  "Детский сад и детский центр": [
    "Bog‘cha va bolalar markazi",
    "Балабақша және балалар орталығы",
    "Nursery and children's centre",
    "Кӯдакистон ва маркази кӯдакон"
  ],
  "Маникюр и ногтевой сервис": [
    "Manikyur va tirnoq parvarishi",
    "Маникюр және тырнақ күтімі",
    "Manicure and nail care",
    "Маникюр ва нигоҳубини нохун"
  ],
  "Адвокат и юридические услуги": [
    "Advokat va yuridik xizmatlar",
    "Адвокат және заң қызметтері",
    "Legal services",
    "Адвокат ва хизматҳои ҳуқуқӣ"
  ],
  "Бухгалтерия и налоги": [
    "Buxgalteriya va soliqlar",
    "Бухгалтерия және салықтар",
    "Accounting and tax",
    "Муҳосибӣ ва андозҳо"
  ],
  "Салон красоты": [
    "Go‘zallik saloni",
    "Сұлулық салоны",
    "Beauty salon",
    "Салони зебоӣ"
  ],
  "Клиника и медицинские услуги": [
    "Klinika va tibbiy xizmatlar",
    "Клиника және медициналық қызметтер",
    "Clinic and healthcare",
    "Дармонгоҳ ва хизматҳои тиббӣ"
  ],
  "Стоматология": [
    "Stomatologiya",
    "Стоматология",
    "Dentistry",
    "Дандонпизишкӣ"
  ],
  "Фитнес и спорт": [
    "Fitnes va sport",
    "Фитнес және спорт",
    "Fitness and sport",
    "Фитнес ва варзиш"
  ],
  "Недвижимость": [
    "Ko‘chmas mulk",
    "Жылжымайтын мүлік",
    "Real estate",
    "Амволи ғайриманқул"
  ],
  "Автосервис": [
    "Avtoservis",
    "Автосервис",
    "Car services",
    "Хизматрасонии мошин"
  ],
  "Клининг": [
    "Tozalash xizmatlari",
    "Тазалау қызметтері",
    "Cleaning services",
    "Хизматҳои тозакунӣ"
  ],
  "IT и цифровые услуги": [
    "IT va raqamli xizmatlar",
    "IT және цифрлық қызметтер",
    "IT and digital services",
    "IT ва хизматҳои рақамӣ"
  ],
  "Доставка и логистика": [
    "Yetkazib berish va logistika",
    "Жеткізу және логистика",
    "Delivery and logistics",
    "Расонидан ва логистика"
  ],
  "Туризм и экскурсии": [
    "Turizm va sayohatlar",
    "Туризм және экскурсиялар",
    "Travel and tours",
    "Сайёҳӣ ва саёҳатҳо"
  ],
  "Фото и видео": [
    "Foto va video",
    "Фото және бейне",
    "Photo and video",
    "Акс ва видео"
  ],
  "Мебель и интерьер": [
    "Mebel va interyer",
    "Жиһаз және интерьер",
    "Furniture and interiors",
    "Мебел ва ороиши дохилӣ"
  ],
  "Ремонт техники": [
    "Texnika taʼmiri",
    "Техника жөндеу",
    "Appliance repairs",
    "Таъмири таҷҳизот"
  ],
  "Другая деятельность": [
    "Boshqa faoliyat",
    "Басқа қызмет",
    "Other business",
    "Фаъолияти дигар"
  ],
  "За столом": [
    "Dasturxon atrofida",
    "Дастарқан басында",
    "At the table",
    "Сари дастархон"
  ],
  "Линия": [
    "Chiziq",
    "Сызық",
    "Line",
    "Хат"
  ],
  "Контур": [
    "Tarh",
    "Сұлба",
    "Contour",
    "Тарҳ"
  ],
  "Улыбка": [
    "Tabassum",
    "Күлкі",
    "Smile",
    "Табассум"
  ],
  "Витрина": [
    "Vitrina",
    "Сөре",
    "Showcase",
    "Пештахта"
  ],
  "Горизонт": [
    "Ufq",
    "Көкжиек",
    "Horizon",
    "Уфуқ"
  ],
  "Основание": [
    "Asos",
    "Негіз",
    "Foundation",
    "Асос"
  ],
  "Образ": [
    "Qiyofa",
    "Бейне",
    "Look",
    "Симо"
  ],
  "Пульс": [
    "Nabz",
    "Тамыр соғысы",
    "Pulse",
    "Набз"
  ],
  "Росток": [
    "Nihol",
    "Өскін",
    "Sprout",
    "Ниҳол"
  ],
  "Баланс": [
    "Muvozanat",
    "Тепе теңдік",
    "Balance",
    "Тавозун"
  ],
  "Чистая форма": [
    "Sof shakl",
    "Таза пішін",
    "Pure form",
    "Шакли тоза"
  ],
  "История": [
    "Hikoya",
    "Оқиға",
    "Story",
    "Қисса"
  ],
  "Импульс": [
    "Turtki",
    "Серпін",
    "Impulse",
    "Такон"
  ],
  "Место": [
    "Makon",
    "Мекен",
    "Place",
    "Макон"
  ],
  "Траектория": [
    "Yo‘nalish",
    "Бағыт",
    "Trajectory",
    "Масир"
  ],
  "Свежесть": [
    "Musaffolik",
    "Тазалық",
    "Freshness",
    "Тароват"
  ],
  "Сдвиг": [
    "O‘zgarish",
    "Өзгеріс",
    "Shift",
    "Тағйир"
  ],
  "Маршрут": [
    "Yo‘l",
    "Бағдар",
    "Route",
    "Роҳ"
  ],
  "Далеко": [
    "Olislarga",
    "Алысқа",
    "Far away",
    "Дур"
  ],
  "Кадр": [
    "Kadr",
    "Кадр",
    "Frame",
    "Кадр"
  ],
  "Предмет": [
    "Buyum",
    "Бұйым",
    "Object",
    "Ашё"
  ],
  "Мастерская": [
    "Ustaxona",
    "Шеберхана",
    "Workshop",
    "Устохона"
  ],
  "Точка": [
    "Nuqta",
    "Нүкте",
    "Point",
    "Нуқта"
  ],
  "Тихий вкус": [
    "Mayin taʼm",
    "Нәзік дәм",
    "Quiet taste",
    "Лаззати нозук"
  ],
  "Условия использования сервиса": [
    "Xizmatdan foydalanish shartlari",
    "Сервисті пайдалану шарттары",
    "Terms of use",
    "Шартҳои истифодаи хизмат"
  ],
  "Мы сохраняем данные, которые вы передаёте через формы: имя, контакт и описание задачи. Они используются для ответа на обращение. Данные заявок на конкретном сайте доступны владельцу этого сайта и уполномоченным сотрудникам; при подключении уведомлений они передаются в Telegram. Не отправляйте пароли, платёжные или медицинские сведения в формах. Для технической работы используются сессионные cookies, а избранные шаблоны сохраняются в вашем браузере. Счётчики действий агрегируются по дням без хранения личности посетителя. Чтобы запросить исправление или удаление своих данных, обратитесь к тому, кто предоставил вам сайт или доступ к кабинету.": [
    "Formalarda yuborgan maʼlumotlaringizni saqlaymiz: ism, aloqa va vazifa tavsifi. Ulardan murojaatingizga javob berish uchun foydalaniladi. Muayyan saytdagi so‘rovlar shu sayt egasi va vakolatli xodimlariga ko‘rinadi; bildirishnomalar yoqilsa, ular Telegramga yuboriladi. Formalarda parol, to‘lov yoki tibbiy maʼlumotlarni yubormang. Texnik ishlash uchun seans cookies fayllari ishlatiladi, saralangan shablonlar esa brauzeringizda saqlanadi. Harakatlar hisoblagichlari tashrif buyuruvchining shaxsini saqlamasdan kunlar bo‘yicha jamlanadi. Maʼlumotlaringizni tuzatish yoki o‘chirish uchun sizga sayt yoki kabinetga kirishni taqdim etgan kishiga murojaat qiling.",
    "Формалар арқылы жіберген деректеріңізді сақтаймыз: аты, байланысы және міндет сипаттамасы. Олар өтінішіңізге жауап беру үшін қолданылады. Белгілі бір сайттағы өтінімдер сол сайттың иесіне және уәкілетті қызметкерлеріне қолжетімді; хабарламалар қосылса, Telegram арқылы жіберіледі. Формаларда құпиясөз, төлем немесе медициналық деректерді жібермеңіз. Техникалық жұмыс үшін сессиялық cookies қолданылады, таңдаулы үлгілер браузеріңізде сақталады. Әрекет санауыштары келушінің жеке басын сақтамай, күндер бойынша жинақталады. Деректеріңізді түзету немесе жою үшін сізге сайтты не кабинетке қолжетімділікті берген адамға хабарласыңыз.",
    "We store the information you submit through forms: your name, contact details and description of your request. We use it to respond to you. Requests on an individual website are accessible to its owner and authorised employees; when notifications are connected, they are sent to Telegram. Do not submit passwords, payment or medical information through these forms. Session cookies support technical functions, and favourite templates are stored in your browser. Action counters are aggregated by day without storing visitor identity. To request correction or deletion of your data, contact the person who provided your website or dashboard access.",
    "Маълумотеро, ки тавассути шаклҳо мефиристед, нигоҳ медорем: ном, тамос ва тавсифи вазифа. Онҳо барои ҷавоб ба муроҷиат истифода мешаванд. Дархостҳои сомонаи алоҳида ба соҳиби он ва кормандони ваколатдор дастрасанд; ҳангоми пайваст будани огоҳиҳо ба Telegram фиристода мешаванд. Парол, маълумоти пардохт ё тиббиро тавассути шаклҳо нафиристед. Барои кори техникӣ cookies-и нишаст истифода мешаванд ва қолабҳои баргузида дар браузери шумо нигоҳ дошта мешаванд. Ҳисоби амалҳо аз рӯи рӯзҳо бе нигоҳ доштани шахсияти меҳмон ҷамъбаст мешавад. Барои ислоҳ ё нест кардани маълумоти худ ба шахсе муроҷиат кунед, ки сомона ё дастрасии кабинетро ба шумо додааст."
  ],
  "Saayt.link предоставляет инструменты создания и редактирования сайтов. Стоимость, состав работ и сроки запуска согласовываются отдельно до начала работы. Публикуйте только содержание, на которое у вас есть права. За актуальность цен, контактов и описаний отвечает владелец сайта. Отправка формы не является оплатой или подтверждением бронирования: наличие и время подтверждает бизнес. Уведомления в Telegram требуют предварительного подключения бота; заявки также сохраняются в кабинете. Берегите логин и пароль клиента, не передавайте их посторонним. Для изменения доступа или решения вопроса по сайту свяжитесь с тем, кто выдал вам кабинет.": [
    "Saayt.link sayt yaratish va tahrirlash vositalarini taqdim etadi. Narx, ish hajmi va ishga tushirish muddati ish boshlanishidan oldin alohida kelishiladi. Faqat foydalanish huquqiga ega mazmunni eʼlon qiling. Narxlar, aloqa va tavsiflarning dolzarbligi uchun sayt egasi javobgar. Forma yuborish to‘lov yoki band qilishni tasdiqlash emas: mavjudlik va vaqtni biznes tasdiqlaydi. Telegram bildirishnomalari uchun avval botni ulash kerak; so‘rovlar kabinetda ham saqlanadi. Mijoz login va parolini begonalarga bermang. Kirishni o‘zgartirish yoki sayt bo‘yicha masala uchun sizga kabinet bergan kishiga murojaat qiling.",
    "Saayt.link сайт жасау және өңдеу құралдарын ұсынады. Баға, жұмыс көлемі және іске қосу мерзімі жұмыс басталғанға дейін бөлек келісіледі. Құқығыңыз бар мазмұнды ғана жариялаңыз. Бағалар, байланыс пен сипаттамалардың өзектілігіне сайт иесі жауап береді. Форманы жіберу төлем немесе бронды растау болып саналмайды: қолжетімділік пен уақытты бизнес растайды. Telegram хабарламалары үшін ботты алдын ала қосу керек; өтінімдер кабинетте де сақталады. Клиенттің логині мен құпиясөзін бөгде адамдарға бермеңіз. Қолжетімділікті өзгерту немесе сайт мәселелері үшін кабинетті берген адамға хабарласыңыз.",
    "Saayt.link provides tools to create and edit websites. Prices, scope of work and launch dates are agreed separately before work begins. Publish only content you have the right to use. The website owner is responsible for keeping prices, contacts and descriptions up to date. Submitting a form is not payment or booking confirmation: the business confirms availability and timing. Telegram notifications require connecting the bot first; requests are also stored in the dashboard. Keep the client's login and password private. For access changes or website questions, contact the person who provided the dashboard.",
    "Saayt.link воситаҳои сохтан ва таҳрири сомонаҳоро пешниҳод мекунад. Нарх, ҳаҷми кор ва муҳлати оғоз пеш аз кор ҷудогона мувофиқа мешаванд. Танҳо муҳтавоеро нашр кунед, ки ҳуқуқи истифодаашро доред. Барои дурустии нархҳо, тамос ва тавсифҳо соҳиби сомона масъул аст. Фиристодани шакл пардохт ё тасдиқи брон нест: мавҷудият ва вақтро тиҷорат тасдиқ мекунад. Барои огоҳиҳои Telegram аввал ботро пайваст кардан лозим аст; дархостҳо дар кабинет низ нигоҳ дошта мешаванд. Логин ва пароли муштариро ба бегонагон надиҳед. Барои тағйири дастрасӣ ё масъалаҳои сомона ба шахсе муроҷиат кунед, ки кабинетро додааст."
  ],
  "Saayt.link — сайты, меню и заявки для бизнеса": [
    "Saayt.link — biznes uchun saytlar, menyu va so‘rovlar",
    "Saayt.link — бизнеске арналған сайттар, мәзір және өтінімдер",
    "Saayt.link — websites, menus and customer requests",
    "Saayt.link — сомонаҳо, меню ва дархостҳо барои тиҷорат"
  ],
  "Сайты для кафе, гостиниц и услуг. Меняйте фотографии, цены и контакты в кабинете. Получайте заявки клиентов в кабинете и Telegram.": [
    "Kafe, mehmonxona va xizmatlar uchun saytlar. Suratlar, narxlar va aloqani kabinetda o‘zgartiring. So‘rovlarni kabinet va Telegramda oling.",
    "Кафе, қонақүй және қызметтерге арналған сайттар. Фотосуреттерді, бағалар мен байланысты кабинетте өзгертіңіз. Өтінімдерді кабинетте және Telegram арқылы алыңыз.",
    "Websites for cafés, hotels and service businesses. Edit photos, prices and contacts in your dashboard. Receive requests in your dashboard and Telegram.",
    "Сомонаҳо барои қаҳвахонаҳо, меҳмонхонаҳо ва хизматҳо. Аксҳо, нархҳо ва тамосро дар кабинет иваз кунед. Дархостҳоро дар кабинет ва Telegram гиред."
  ],
  "Каталог шаблонов — Saayt.link": [
    "Shablonlar katalogi — Saayt.link",
    "Үлгілер каталогі — Saayt.link",
    "Template catalogue — Saayt.link",
    "Феҳристи қолабҳо — Saayt.link"
  ],
  "Собственные дизайны Saayt.link для ресторанов, магазинов и услуг. Полный просмотр, редактирование и публикация сайта.": [
    "Restoran, do‘kon va xizmatlar uchun Saayt.link dizaynlari. Saytni to‘liq ko‘rish, tahrirlash va eʼlon qilish.",
    "Мейрамхана, дүкен және қызметтерге арналған Saayt.link дизайндары. Сайтты толық қарау, өңдеу және жариялау.",
    "Saayt.link designs for restaurants, shops and services. Preview, edit and publish your website.",
    "Тарҳҳои Saayt.link барои тарабхонаҳо, мағозаҳо ва хизматҳо. Дидани пурра, таҳрир ва нашри сомона."
  ],
  "Меню Контакты": [
    "Menyu　Aloqa",
    "Мәзір　Байланыс",
    "Menu　Contact",
    "Меню　Тамос"
  ],
  "Получите расчёт под вашу задачу": [
    "Vazifangiz uchun narx hisobini oling",
    "Міндетіңізге сай баға есебін алыңыз",
    "Get a quote for your needs",
    "Барои вазифаи худ ҳисоб гиред"
  ],
  "Место для новой истории": [
    "Yangi hikoya uchun joy",
    "Жаңа оқиғаға арналған орын",
    "A place for a new story",
    "Ҷой барои қиссаи нав"
  ]
};
export function uiText(language:PublicLanguage,ru:string){if(language==='ru')return ru;return publicTranslations[ru]?.[language==='uz'?0:language==='kk'?1:language==='en'?2:3]??ru}
