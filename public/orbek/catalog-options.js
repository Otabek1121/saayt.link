const plumbingCategories=['pump','pipe','fitting','valve','filter','hose','trap'];
const optionKeys=[...plumbingCategories,'channel','manager','gallery','limit','waError','removePhoto','photoLabel','search'];
const optionLabels={
 ru:['Насосы','Трубы','Фитинги','Запорная арматура','Фильтры воды','Шланги','Сифоны','Telegram-канал','Написать администратору','Дополнительные фотографии (до 5)','Можно добавить до пяти дополнительных фотографий.','Введите ссылку wa.me с международным номером.','Убрать фото','Фото','Поиск по каталогу'],
 uz:['Nasoslar','Quvurlar','Fitinglar','Yopish armaturasi','Suv filtrlari','Shlanglar','Sifonlar','Telegram kanali','Administratorga yozish','Qo‘shimcha suratlar (5 tagacha)','Beshtagacha qo‘shimcha surat tanlang.','Xalqaro raqam bilan wa.me havolasini kiriting.','Suratni olib tashlash','Surat','Katalogdan qidirish'],
 en:['Pumps','Pipes','Fittings','Shut-off valves','Water filters','Hoses','Drain traps','Telegram channel','Message the shop','Additional photos (up to 5)','Choose up to five additional photos.','Enter a wa.me link with an international number.','Remove photo','Photo','Search catalog'],
 zh:['水泵','管道','管件','阀门','净水过滤器','软管','存水弯','Telegram 频道','联系管理员','其他照片（最多 5 张）','最多可添加五张其他照片。','请输入含国际号码的 wa.me 链接。','移除照片','照片','搜索商品'],
 hi:['पंप','पाइप','फिटिंग','शट-ऑफ वाल्व','वॉटर फ़िल्टर','होज़ पाइप','ड्रेन ट्रैप','Telegram चैनल','दुकान से बात करें','अतिरिक्त फ़ोटो (अधिकतम 5)','अधिकतम पाँच अतिरिक्त फ़ोटो चुनें।','अंतरराष्ट्रीय नंबर वाला wa.me लिंक दर्ज करें।','फ़ोटो हटाएँ' ,'फ़ोटो','कैटलॉग खोजें']
};
function optionLabel(lang,key){return optionLabels[lang][optionKeys.indexOf(key)]}
