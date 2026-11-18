'use strict';
const strings = {
 ru: ['Магазин','Управление магазином','Для входа нужен аккаунт администратора магазина.','Войти','Товары','Добавить товар','Категория','Цена, UZS','Название на пяти языках','Фотография (JPEG, PNG, WebP · 6 MB)','Сохранить','Отмена','Удалить','Контакты магазина','Телефон','Ссылка на точку на карте','Редактировать','Новый товар','Редактирование товара','Удалить этот товар?','Сохранено','Не удалось выполнить запрос. Попробуйте ещё раз.','Данные изменились. Обновите страницу, прежде чем сохранять снова.','Пока нет товаров','Загрузка…','Сохранение…','Добавьте фотографию товара.','Используйте ссылку https://t.me/…','Введите ссылку HTTPS.','Проверить размер и тип файла','Повторить'],
 uz: ['Do‘kon','Do‘kon boshqaruvi','Kirish uchun do‘kon administratori hisobidan foydalaning.','Kirish','Mahsulotlar','Mahsulot qo‘shish','Turkum','Narx, UZS','Besh tildagi nomi','Surat (JPEG, PNG, WebP · 6 MB)','Saqlash','Bekor qilish','O‘chirish','Do‘kon kontaktlari','Telefon','Xaritadagi manzil havolasi','Tahrirlash','Yangi mahsulot','Mahsulotni tahrirlash','Bu mahsulot o‘chirilsinmi?','Saqlandi','So‘rov bajarilmadi. Yana urinib ko‘ring.','Ma’lumotlar o‘zgardi. Saqlashdan oldin sahifani yangilang.','Hozircha mahsulot yo‘q','Yuklanmoqda…','Saqlanmoqda…','Mahsulot suratini qo‘shing.','https://t.me/… havolasini ishlating.','HTTPS havolasini kiriting.','Fayl hajmi va turini tekshiring','Qayta urinish'],
 en: ['Store','Store management','Sign in with the store administrator account.','Sign in','Products','Add product','Category','Price, UZS','Product name in five languages','Photo (JPEG, PNG, WebP · 6 MB)','Save','Cancel','Delete','Store contacts','Phone','Map location URL','Edit','New product','Edit product','Delete this product?','Saved','Request failed. Please try again.','The catalog changed. Reload this page before saving again.','No products yet','Loading…','Saving…','Add a product photo.','Use a https://t.me/… link.','Enter an HTTPS link.','Check the file size and type','Retry'],
 zh: ['商店','商店管理','请使用商店管理员账号登录。','登录','商品','添加商品','分类','价格（UZS）','五种语言的商品名称','照片（JPEG、PNG、WebP · 6 MB）','保存','取消','删除','商店联系方式','电话','地图位置链接','编辑','新商品','编辑商品','删除此商品？','已保存','请求失败，请重试。','目录已更改。请刷新页面后再保存。','暂无商品','加载中…','保存中…','请添加商品照片。','请使用 https://t.me/… 链接。','请输入 HTTPS 链接。','请检查文件大小和类型','重试'],
 hi: ['दुकान','दुकान प्रबंधन','दुकान के व्यवस्थापक खाते से साइन इन करें।','साइन इन करें','उत्पाद','उत्पाद जोड़ें','श्रेणी','कीमत, UZS','पाँच भाषाओं में उत्पाद का नाम','फ़ोटो (JPEG, PNG, WebP · 6 MB)','सहेजें','रद्द करें','हटाएँ','दुकान के संपर्क','फ़ोन','मानचित्र पर स्थान का लिंक','संपादित करें','नया उत्पाद','उत्पाद संपादित करें','यह उत्पाद हटाएँ?','सहेजा गया','अनुरोध विफल रहा। फिर प्रयास करें।','कैटलॉग बदल गया है। फिर से सहेजने से पहले पेज रीलोड करें।','अभी कोई उत्पाद नहीं','लोड हो रहा है…','सहेजा जा रहा है…','उत्पाद की फ़ोटो जोड़ें।','https://t.me/… का लिंक इस्तेमाल करें।','HTTPS लिंक दर्ज करें।','फ़ाइल का आकार और प्रकार जाँचें','फिर प्रयास करें']
};
const keys='store title denied login catalog add category price names photo save cancel remove contacts phone map edit new editing confirm saved error conflict empty loading saving needPhoto badTelegram badMap badFile retry'.split(' ');
const cats=['faucet','sink','shower','toilet','tub','mirror','vanity','accessories',...plumbingCategories];
const catNames={
 ru:['Смесители','Раковины','Душевые системы','Унитазы','Ванны','Зеркала','Тумбы','Аксессуары'],
 uz:['Aralashtirgichlar','Rakovinalar','Dush tizimlari','Unitazlar','Vannalar','Ko‘zgular','Tumbalar','Aksessuarlar'],
 en:['Faucets','Basins','Showers','Toilets','Bathtubs','Mirrors','Vanities','Accessories'],
 zh:['水龙头','洗手盆','淋浴系统','马桶','浴缸','镜子','浴室柜','配件'],
 hi:['नल','बेसिन','शावर','शौचालय','बाथटब','दर्पण','वैनिटी','सहायक सामान']
};
const $=id=>document.getElementById(id);
const controls=['telegram','phone','map','channel','whatsapp'];
const langs={uz:'O‘zbekcha',ru:'Русский',en:'English',zh:'中文',hi:'हिन्दी'};
let lang=localStorage.getItem('orbek-lang');
if(!Object.hasOwn(langs,lang))lang='ru';
let model,editing=null,previewUrl='',activeStatus='',busy=false,conflict=false;
const t=key=>strings[lang][keys.indexOf(key)]||optionLabel(lang,key);
function el(tag,txt){const node=document.createElement(tag);if(txt!=null)node.textContent=txt;return node}
for(const [key,label] of Object.entries(langs)){
 const wrap=el('label',label),input=el('input');input.id='name-'+key;input.lang=key;input.required=true;input.maxLength=160;wrap.append(input);$('names').append(wrap)
}
function status(key='',error=false){activeStatus=key;$('status').textContent=key?t(key):'';$('status').className=error?'error':''}
function translate(){
 document.documentElement.lang=lang;$('lang').setAttribute('aria-label',({ru:'Язык',uz:'Til',zh:'语言',hi:'भाषा',en:'Language'})[lang]);document.title=t('title')+' · ORBEK';$('lang').value=lang;
 document.querySelectorAll('[data-t]').forEach(node=>node.textContent=t(node.dataset.t));
 const current=$('category').value;$('category').replaceChildren(...cats.map((cat,i)=>new Option(catNames[lang][i]||t(cat),cat)));
 if(cats.includes(current))$('category').value=current;
 $('heading').textContent=t(editing?'editing':'new');
 if(activeStatus)status(activeStatus,$('status').classList.contains('error'));
 if(model){renderList();renderGallery()}
}
$('lang').onchange=()=>{lang=$('lang').value;localStorage.setItem('orbek-lang',lang);translate()};
$('catalogSearch').oninput=renderList;
function renderList(){
 $('list').replaceChildren();
 const query=$('catalogSearch').value.trim().toLocaleLowerCase(lang);
 const matches=model.items.filter(item=>[...Object.values(item.names),catNames[lang][cats.indexOf(item.category)]||t(item.category)].join(' ').toLocaleLowerCase(lang).includes(query));
 if(!matches.length)$('list').append(el('p',t('empty')));
 for(const item of matches){
  const row=el('div');row.className='row';const img=el('img');img.src=item.image;img.loading='lazy';img.alt='';
  const details=el('div');details.append(el('strong',item.names[lang]),el('small',new Intl.NumberFormat(lang).format(item.price)+' UZS'));
  const button=el('button',t('edit'));button.type='button';button.disabled=busy||conflict;button.onclick=()=>openItem(item);
  row.append(img,details,button);$('list').append(row);
 }
}
let retainedPhotos=[];
function renderGallery(){
 $('galleryList').replaceChildren();
 retainedPhotos.forEach((url,index)=>{
  const row=el('div');row.className='row';const image=el('img');image.src=url;image.alt='';
  const button=el('button',t('removePhoto')+' '+(index+1));button.type='button';
  button.onclick=()=>{retainedPhotos.splice(index,1);renderGallery()};row.append(image,button);$('galleryList').append(row);
 });
}
function clearPreview(){if(previewUrl)URL.revokeObjectURL(previewUrl);previewUrl=''}
function openItem(item=null){
 clearPreview();editing=item;retainedPhotos=[...(item?.photos||[])];renderGallery();$('editor').reset();$('editor').hidden=false;$('remove').hidden=!item;$('heading').textContent=t(item?'editing':'new');
 $('category').value=item?.category||cats[0];$('price').value=item?.price??'';
 for(const key of Object.keys(langs))$('name-'+key).value=item?.names[key]||'';
 $('preview').hidden=!item?.image;if(item?.image)$('preview').src=item.image;else $('preview').removeAttribute('src');
 $('editor').scrollIntoView({block:'start'});$('category').focus({preventScroll:true});
}
function closeItem(){clearPreview();$('editor').hidden=true;editing=null}
$('add').onclick=()=>openItem();$('cancel').onclick=closeItem;
$('photo').onchange=()=>{clearPreview();const file=$('photo').files[0];previewUrl=file?URL.createObjectURL(file):'';const src=previewUrl||editing?.image;$('preview').hidden=!src;if(src)$('preview').src=src};
function lock(value){
 busy=value;for(const f of document.querySelectorAll('fieldset'))f.disabled=value||conflict;
 $('add').disabled=value||conflict;renderList();
}
async function request(url,options){
 const result=await fetch(url,options);
 if(!result.ok){const error=new Error('request');error.code=result.status;throw error}
 return result;
}
async function save(action,close=false){
 if(busy||conflict)return;lock(true);status('saving');
 try{
  const change=await action();
  const result=await request('/orbek/api/catalog',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:model.items,contacts:model.contacts,revision:model.revision,...change})});
  const saved=await result.json();
  if(saved.revision==null){conflict=true;status('conflict',true);return}
  model={...model,...change,revision:saved.revision};
  if(close)closeItem();status('saved');
 }catch(err){if(err.code===409){conflict=true;status('conflict',true)}else if(err.code===401||err.code===403){$('panel').hidden=true;$('guard').hidden=false;status()}else status(err.code===413||err.code===415?'badFile':'error',true)}
 finally{lock(false)}
}
$('editor').onsubmit=event=>{
 event.preventDefault();const file=$('photo').files[0];
 const extra=Array.from($('gallery').files);
 if(extra.length+retainedPhotos.length>5){status('limit',true);return}
 if(extra.some(f=>f.size>6*1024*1024||!['image/jpeg','image/png','image/webp'].includes(f.type))){status('badFile',true);return}
 if(!file&&!editing?.image){status('needPhoto',true);$('photo').focus();return}
 if(file&&(file.size>6*1024*1024||!['image/jpeg','image/png','image/webp'].includes(file.type))){status('badFile',true);$('photo').focus();return}
 const item={demo:false,id:editing?.id||crypto.randomUUID(),category:$('category').value,price:Number($('price').value),image:editing?.image||'',names:{}};
 for(const key of Object.keys(langs)){const input=$('name-'+key);item.names[key]=input.value.trim();if(!item.names[key]){input.focus();return}}
 save(async()=>{
  if(file){
   const uploaded=await request('/orbek/api/image',{method:'POST',headers:{'Content-Type':file.type},body:file});
   const {url}=await uploaded.json();if(typeof url!=='string'||!url)throw Error('upload');item.image=url;
  }
  item.photos=[...retainedPhotos];
  for(const photo of extra){
   const result=await request('/orbek/api/image',{method:'POST',headers:{'Content-Type':photo.type},body:photo});
   item.photos.push((await result.json()).url);
  }
  return {items:editing?model.items.map(old=>old.id===item.id?item:old):[...model.items,item]};
 },true);
};
$('remove').onclick=()=>{if(editing&&window.confirm(t('confirm')))save(()=>({items:model.items.filter(item=>item.id!==editing.id)}),true)};
$('contacts').onsubmit=event=>{
 event.preventDefault();const contacts=Object.fromEntries(controls.map(id=>[id,$(id).value.trim()]));
 contacts.channel=contacts.channel.replace(/\/$/,'');contacts.whatsapp=contacts.whatsapp.replace(/\/$/,'');
 if(contacts.channel&&!/^https:\/\/t\.me\/(?:[A-Za-z0-9_]+|\+[A-Za-z0-9_-]+)$/.test(contacts.channel)){status('badTelegram',true);$('channel').focus();return}
 if(contacts.whatsapp&&!/^https:\/\/wa\.me\/[1-9][0-9]{6,14}$/.test(contacts.whatsapp)){status('waError',true);$('whatsapp').focus();return}
 if(contacts.telegram&&!/^https:\/\/t\.me\/[a-zA-Z0-9_]+\/?$/.test(contacts.telegram)){status('badTelegram',true);$('telegram').focus();return}
 if(contacts.map&&!/^https:\/\//.test(contacts.map)){status('badMap',true);$('map').focus();return}
 contacts.telegram=contacts.telegram.replace(/\/$/,'');save(()=>({contacts}));
};
async function start(){
 status('loading');
 try{
  const response=await request('/orbek/api/catalog',{cache:'no-store'});model=await response.json();status();
  if(!model.admin){$('guard').hidden=false;return}
  $('panel').hidden=false;controls.forEach(id=>$(id).value=model.contacts[id]||'');renderList();
 }catch{status('error',true);const retry=el('button',t('retry'));retry.type='button';retry.onclick=start;$('status').append(' ',retry)}
}
translate();start();
