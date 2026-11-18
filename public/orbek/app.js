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
 const a=el("a","detail-link",t("ask"));a.href=chat||"#contacts";a.onclick=()=>$("detail").close();copy.append(a);
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
  b.append(photo(i),copy);b.onclick=()=>{openItem=i;drawDetail();$("detail").showModal()};grid.append(b)
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
 $("admin").hidden=!catalog?.admin;
 rateText();renderFilters();renderProducts();contacts();drawDetail()
}
async function loadCatalog(){
 failed=false;renderProducts();
 try{const r=await fetch("/orbek/api/catalog",{cache:"no-store"});if(!r.ok)throw Error();const data=await r.json();if(!Array.isArray(data.items))throw Error();catalog=data;render()}catch{failed=true;renderProducts()}
}
async function loadRate(){
 try{const r=await fetch("/orbek/api/rate");if(!r.ok)throw Error();const data=await r.json();if(!(Number(data.rate)>0))throw Error();rate=data}catch{if(rate)rate.stale=true}finally{rateSettled=true;rateText();renderProducts();drawDetail()}
}
$("lang").onchange=()=>{lang=$("lang").value;try{localStorage.setItem("orbek-lang",lang)}catch{}render()};
$("query").oninput=renderProducts;$("close").onclick=()=>$("detail").close();$("detail").onclose=()=>{openItem=null};$("detail").onclick=e=>{if(e.target===$("detail"))$("detail").close()};
render();loadCatalog();loadRate();setInterval(loadRate,30*60*1000);
})();
