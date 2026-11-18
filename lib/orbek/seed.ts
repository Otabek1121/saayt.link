const rows: [string,string,number,string,string,string,string,string][] = [
 ['black-tap','faucet',650000,'Чёрный смеситель','Qora aralashtirgich','Black mixer tap','काला मिक्सर नल','黑色混水龙头'],
 ['basin','sink',840000,'Накладная раковина','Ustki qo‘l yuvgich','Countertop basin','काउंटरटॉप बेसिन','台上盆'],
 ['shower','shower',1650000,'Душевая система','Dush tizimi','Shower system','शावर सिस्टम','淋浴套装'],
 ['mirror','mirror',780000,'Зеркало для ванной','Hammom oynasi','Bathroom mirror','बाथरूम का दर्पण','浴室镜'],
 ['chrome-tap','faucet',495000,'Хромированный смеситель','Xrom aralashtirgich','Chrome mixer tap','क्रोम मिक्सर नल','镀铬混水龙头'],
 ['bath','tub',3800000,'Отдельностоящая ванна','Alohida turadigan vanna','Freestanding bath','फ्रीस्टैंडिंग बाथटब','独立式浴缸'],
 ['toilet','toilet',1850000,'Унитаз','Unitaz','Toilet','टॉयलेट','坐便器'],
 ['vanity','vanity',2150000,'Тумба для ванной','Hammom tumbasi','Bathroom vanity','बाथरूम वैनिटी','浴室柜']
];
export const initialCatalog = {items:rows.map(([id,category,price,ru,uz,en,hi,zh])=>({id,category,price,demo:true,names:{ru,uz,en,hi,zh},image:'/orbek/img/'+id+'.webp'})),contacts:{channel:'https://t.me/ORBEK_SAM',telegram:'https://t.me/Ixtiwka800',whatsapp:'https://wa.me/998915506700',phone:'+998915506700',map:'https://www.google.com/maps/search/?api=1&query=Rudakiy+150A%2C+Samarqand%2C+Uzbekistan'}};
