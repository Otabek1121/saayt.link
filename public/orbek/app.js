(() => {
const $=id=>document.getElementById(id);
const locale={ru:"ru-RU",uz:"uz-UZ",hi:"hi-IN",en:"en-US",zh:"zh-CN"};
let lang="ru";
try{lang=localStorage.getItem("orbek-lang")||"ru"}catch{}
if(!(lang in lexicon))lang="ru";
let catalog=null,rate=null,rateSettled=false,failed=false,category="",openItem=null;
const t=key=>lexicon[lang][key]||optionLabel(lang,key)||key;
const el=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!=null)n.textContent=value;return n};
const format=(n,d=0)=>new Intl.NumberFormat(locale[lang],{maximumFractionDigits:d}).format(n);
function allowed(value,kind){
 if(!value)return "";
 if(kind==="phone"){const n=String(value).replace(/^tel:/,"").replace(/[\s()-]/g,"");return /^\+?\d{6,16}$/.test(n)?"tel:"+n:""}
 try{const u=new URL(value,location.origin);if(kind==="image"&&u.origin===location.origin)return u.href;if(u.protocol!=="https:")return "";if(kind==="whatsapp"&&u.hostname!=="wa.me")return "";if(kind==="telegram"&&!["t.me","telegram.me"].includes(u.hostname))return "";return u.href}catch{return ""}
}
function rateText(){
 if(!rate?.rate){$("rate").textContent=rateSettled?t("noRate"):"";return}
 const title=t(rate.stale?"stale":"rate");
 const day=rate.date?new Date(rate.date+"T00:00:00Z"):null;
 const stamp=day&&Number.isFinite(day.valueOf())?new Intl.DateTimeFormat(locale[lang],{timeZone:"UTC"}).format(day):"";
 $("rate").textContent=title+" "+stamp+" · 1 USD = "+format(rate.rate,2)+" UZS";$("rate").title=title+" "+stamp;
}
const cartLabels={
 ru:['Корзина','В корзину','В корзине','Корзина пуста','Итого','Отправить в Telegram','Заказ ORBEK','Закрыть','Удалить','Скопировать заказ','Скопировано'],
 uz:['Savat','Savatga qo‘shish','Savatda','Savat bo‘sh','Jami','Telegram orqali yuborish','ORBEK buyurtmasi','Yopish','O‘chirish','Buyurtmani nusxalash','Nusxalandi'],
 en:['Cart','Add to cart','In cart','Your cart is empty','Total','Send via Telegram','ORBEK order','Close','Remove','Copy order','Copied'],
 hi:['कार्ट','कार्ट में जोड़ें','कार्ट में','कार्ट खाली है','कुल','Telegram पर भेजें','ORBEK ऑर्डर','बंद करें','हटाएँ','ऑर्डर कॉपी करें','कॉपी हो गया'],
 zh:['购物车','加入购物车','已加入','购物车为空','合计','通过 Telegram 发送','ORBEK 订单','关闭','移除','复制订单','已复制']
};
const cart=new Map();
try{
 const saved=JSON.parse(localStorage.getItem('orbek-cart')||'[]');
 for(const [id,n] of saved)if(typeof id==='string'&&Number.isInteger(n)&&n>0&&n<=999)cart.set(id,n);
}catch{}
const ct=i=>cartLabels[lang][i];
function cartButton(label,action){
 const button=el('button','cart-btn',label);button.type='button';button.onclick=action;return button;
}
function quantity(id,n){
 if(n>0)cart.set(id,Math.min(n,999));else cart.delete(id);
 try{localStorage.setItem('orbek-cart',JSON.stringify([...cart]))}catch{}
 renderCart();renderProducts();drawDetail();
}
function addButton(i){
 const n=cart.get(i.id)||0;
 return cartButton(n?ct(2)+' · '+n+'  +':ct(1),()=>quantity(i.id,n+1));
}
function renderCart(){
 const box=$('cartLines');box.replaceChildren();
 const rows=(catalog?.items||[]).filter(i=>cart.has(i.id));let total=0,count=0;
 const lines=[ct(6)];
 for(const i of rows){
  const n=cart.get(i.id),sum=n*i.price;total+=sum;count+=n;
  const row=el('div','cart-row'),controls=el('div','cart-qty');
  row.append(el('strong','',title(i)),el('span','',format(sum)+' UZS'));
  for(const [label,next] of [['−',n-1],['+',n+1]]){
   const b=cartButton(label,()=>quantity(i.id,next));b.setAttribute('aria-label',label+' '+title(i));b.disabled=next>999;
   if(label==='+')controls.append(el('span','',String(n)));controls.append(b);
  }
  controls.append(cartButton(ct(8),()=>quantity(i.id,0)));row.append(controls);box.append(row);
  lines.push(title(i)+' × '+n+' = '+format(sum)+' UZS'+(i.demo?' ('+t('sample')+')':''));
 }
 $('cartToggle').textContent='🛒 '+count;$('cartToggle').setAttribute('aria-label',ct(0)+' · '+count);
 $('cartTitle').textContent=ct(0);$('cartClose').setAttribute('aria-label',ct(7));
 if(!rows.length){box.append(el('p','',ct(3)));return}
 const amount=ct(4)+' · '+format(total)+' UZS'+(rate?.rate?' (≈ $'+format(total/rate.rate,2)+')':'');
 box.append(el('strong','cart-total',amount));lines.push(amount);
 const draft=lines.join('\n'),seller=allowed(catalog.contacts.telegram,'telegram');
 if(seller){
  const parts=[''];
  for(const line of lines){
   if(parts[parts.length-1].length+line.length>3400)parts.push('');
   parts[parts.length-1]+=(parts[parts.length-1]?'\n':'')+line;
  }
  parts.forEach((part,index)=>{
   const suffix=parts.length>1?' ('+(index+1)+'/'+parts.length+')':'';
   const a=el('a','detail-link',ct(5)+suffix),url=new URL(seller);
   url.searchParams.set('text',(parts.length>1?ct(6)+suffix+'\n':'')+part);
   a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';box.append(a);
  });
 }
 const copy=cartButton(ct(9),async()=>{try{await navigator.clipboard.writeText(draft);copy.textContent=ct(10)}catch{const field=el('textarea');field.readOnly=true;field.value=draft;box.append(field);field.select()}});box.append(copy);
}
$('cartToggle').onclick=()=>{renderCart();$('basket').showModal()};
$('cartClose').onclick=()=>$('basket').close();

function renderFilters(){
 $("filters").replaceChildren();
 if(!catalog)return;
 const categories=[...new Set(catalog.items.map(i=>i.category))];
 for(const c of ["",...categories]){
  const b=el("button","",t(c||"all"));b.setAttribute("aria-pressed",String(category===c));b.onclick=()=>{category=c;renderFilters();renderProducts();[...$("filters").children].find(n=>n.getAttribute("aria-pressed")==="true")?.focus()};$("filters").append(b)
 }
}
function prices(i){
 const p=el("div","prices",format(i.price)+" UZS");
 if(rate?.rate)p.append(el("span","usd","≈ $"+format(i.price/rate.rate,2)));
 return p
}
function photo(i){const img=el("img","photo");img.alt="";const url=allowed(i.image,"image");if(url)img.src=url;img.loading="lazy";img.decoding="async";return img}
function title(i){return i.names?.[lang]||i.names?.ru||i.id}
function drawDetail(){
 if(!openItem)return;
 const i=openItem,copy=el("div","modal-copy");
 copy.append(el("div","category",t(i.category)),el("h2","",title(i)),prices(i));
 if(i.demo)copy.append(el("p","fine",t("sample")));
 const c=catalog.contacts,chat=allowed(c.telegram,"telegram")||allowed(c.whatsapp,"whatsapp")||allowed(c.phone,"phone");
 const a=el("a","detail-link",t("ask"));a.href=chat||"#contacts";a.onclick=()=>$("detail").close();copy.append(addButton(i),a);
 const mainPhoto=photo(i);
 if(i.photos?.length){
  const strip=el("div","photo-strip");
  [i.image,...i.photos].forEach((url,index)=>{
   const b=el("button");b.type="button";b.setAttribute("aria-label",t("photoLabel")+" "+(index+1));
   b.append(photo({image:url}));b.onclick=()=>{mainPhoto.src=url;strip.querySelectorAll("button").forEach(other=>other.setAttribute("aria-pressed",String(b===other)))};
   b.setAttribute("aria-pressed",String(index===0));strip.append(b);
  });copy.prepend(strip);
 }
 $("detailbody").replaceChildren(mainPhoto,copy);$("detail").setAttribute("aria-label",title(i));
}
function renderProducts(){
 const grid=$("products");grid.replaceChildren();
 if(!catalog){grid.append(el("p","empty",t(failed?"error":"loading")));if(failed){const b=el("button","hero-btn",t("retry"));b.onclick=loadCatalog;grid.append(b)}return}
 const q=$("query").value.trim().toLocaleLowerCase(locale[lang]);
 const items=catalog.items.filter(i=>(!category||i.category===category)&&(title(i)+" "+t(i.category)).toLocaleLowerCase(locale[lang]).includes(q));
 for(const i of items){
  const b=el("button","product"),copy=el("div","product-copy");
  copy.append(el("div","category",t(i.category)),el("div","name",title(i)),prices(i));
  if(i.demo)copy.append(el("div","fine",t("sample")));
  b.append(photo(i),copy);b.onclick=()=>{openItem=i;drawDetail();$("detail").showModal()};const card=el("div","cart-card");card.append(b,addButton(i));grid.append(card)
 }
 if(!items.length)grid.append(el("p","empty",t("empty")));
 $("note").textContent="";
}
function contacts(){
 const c=catalog?.contacts||{},links=$("links");links.replaceChildren();
 const map=allowed(c.map,"map"),phone=allowed(c.phone,"phone"),tg=allowed(c.telegram,"telegram");
 const items=[[phone,String(c.phone||"").replace(/^tel:/,"")],[tg,t("manager")],[allowed(c.channel,"telegram"),t("channel")],[allowed(c.whatsapp,"whatsapp"),"WhatsApp"],[map||"https://www.google.com/maps/search/?api=1&query=ORBEK+Samarkand",t(map?"map":"find")]];
 for(const [href,label] of items){if(!href)continue;const a=el("a","",label);a.href=href;if(href.startsWith("https:")){a.target="_blank";a.rel="noopener noreferrer"}links.append(a)}
 $("address").textContent=map&&/rudak|рудак/i.test(map)&&map.includes("150")?t("address"):t("city");
}
function render(){
 document.documentElement.lang=lang;$("lang").setAttribute("aria-label",({ru:"Язык",uz:"Til",zh:"语言",hi:"भाषा",en:"Language"})[lang]);document.title="ORBEK — "+t("fittings");
 document.querySelector('meta[name="description"]').content=t("shop")+" ORBEK · "+t("city");
 document.querySelectorAll("[data-t]").forEach(n=>n.textContent=t(n.dataset.t));
 $("lang").value=lang;$("query").placeholder=t("search");$("query").setAttribute("aria-label",t("search"));$("close").setAttribute("aria-label",t("close"));document.querySelector(".contact-button").setAttribute("aria-label",t("contact"));
 renderCart();
 rateText();renderFilters();renderProducts();contacts();drawDetail()
}
async function loadCatalog(){
 failed=false;renderProducts();
 try{const r=await fetch("/orbek/api/catalog",{cache:"no-store"});if(!r.ok)throw Error();const data=await r.json();if(!Array.isArray(data.items))throw Error();catalog=data;render()}catch{failed=true;renderProducts()}
}
async function loadRate(){
 try{const r=await fetch("/orbek/api/rate");if(!r.ok)throw Error();const data=await r.json();if(!(Number(data.rate)>0))throw Error();rate=data}catch{if(rate)rate.stale=true}finally{rateSettled=true;rateText();renderCart();renderProducts();drawDetail()}
}
$("lang").onchange=()=>{lang=$("lang").value;try{localStorage.setItem("orbek-lang",lang)}catch{}render()};
$("query").oninput=renderProducts;$("close").onclick=()=>$("detail").close();$("detail").onclose=()=>{openItem=null};$("detail").onclick=e=>{if(e.target===$("detail"))$("detail").close()};
render();loadCatalog();loadRate();setInterval(loadRate,30*60*1000);
})();
