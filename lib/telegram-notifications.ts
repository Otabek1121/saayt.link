import {tokenHash} from './client-password';
async function send(env:Cloudflare.Env,chat:string,text:string){
 const r=await fetch('https://api.telegram.org/bot'+env.TELEGRAM_BOT_TOKEN+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chat,text:text.slice(0,3900),protect_content:true}),signal:AbortSignal.timeout(12000)});
 const data=await r.json() as {ok:boolean;parameters?:{retry_after?:number}};
 if(!r.ok||!data.ok)throw Object.assign(Error('telegram_delivery_failed'),{retryAfter:data.parameters?.retry_after});
}
export async function telegramWebhook(request:Request,env:Cloudflare.Env){
 if(request.method!=='POST')return new Response(null,{status:405});
 if(!env.TELEGRAM_WEBHOOK_SECRET||request.headers.get('x-telegram-bot-api-secret-token')!==env.TELEGRAM_WEBHOOK_SECRET)return new Response(null,{status:403});
 if(!env.DB||!env.TELEGRAM_BOT_TOKEN)return new Response(null,{status:503});
 const raw=await request.text();if(raw.length>16000)return new Response(null,{status:413});
 let update:{message?:{text?:string;chat:{id:number;type:string};from?:{id:number;username?:string}}};try{update=JSON.parse(raw)}catch{return new Response(null,{status:400})}
 const msg=update.message;if(!msg||msg.chat.type!=='private'||msg.from?.id!==msg.chat.id)return Response.json({ok:true});
 const chat=String(msg.chat.id);
 if(msg.text==='/stop'){await env.DB.prepare('UPDATE client_credentials SET telegram_chat_id=NULL, connect_hash=NULL WHERE telegram_chat_id=?').bind(chat).run();await send(env,chat,'Уведомления отключены. Для повторного подключения получите новую ссылку в кабинете.');return Response.json({ok:true})}
 const token=/^\/start\s+([A-Za-z0-9_-]{20,64})$/.exec(msg.text||'')?.[1];
 if(!token){await send(env,chat,'Откройте ссылку подключения из кабинета вашего сайта и нажмите Start. Отключить уведомления: /stop');return Response.json({ok:true})}
 const hash=await tokenHash(token),now=Math.floor(Date.now()/1000);const row=await env.DB.prepare('SELECT project_id,telegram_username FROM client_credentials WHERE connect_hash=? AND connect_expires>? AND enabled=1').bind(hash,now).first<{project_id:string;telegram_username:string}>();
 if(!row||row.telegram_username&&row.telegram_username!==(msg.from.username||'').toLowerCase()){await send(env,chat,'Ссылка истекла или предназначена другому Telegram аккаунту. Попросите новую ссылку.');return Response.json({ok:true})}
 const changed=await env.DB.prepare('UPDATE client_credentials SET telegram_chat_id=?,connect_hash=NULL,connect_expires=NULL WHERE project_id=? AND connect_hash=? AND connect_expires>? AND enabled=1').bind(chat,row.project_id,hash,now).run();if(changed.meta.changes)await send(env,chat,'Сайт подключён. Новые заявки будут приходить сюда. Отключить уведомления: /stop');
 return Response.json({ok:true});
}
export function notificationText(site:string,kind:string,p:Record<string,unknown>){
 const label=kind==='booking'?'Бронирование номера':p.requestType==='order'?'Заказ блюда':p.requestType==='reservation'?'Бронь стола':'Запись на услугу';
 const lines=[label+' · '+site,'Имя: '+String(p.name||''),'Телефон: '+String(p.phone||'')];
 for(const [key,label] of [['itemTitle','Позиция'],['quantity','Количество'],['price','Цена из меню'],['date','Дата'],['time','Время'],['checkin','Заезд'],['checkout','Выезд'],['roomTitle','Номер'],['guests','Гостей'],['note','Комментарий']])if(p[key])lines.push(label+': '+String(p[key]));
 lines.push('Это заявка. Подтвердите наличие и время с клиентом.');return lines.join('\n');
}
export async function flushNotifications(env:Cloudflare.Env){
 if(!env.TELEGRAM_BOT_TOKEN||!env.DB)return;
 const db=env.DB,now=Math.floor(Date.now()/1000);
 // A lease prevents concurrent scheduled/request flushes from sending one event together.
 const due=await db.prepare(`SELECT event_id FROM notification_outbox WHERE (status='pending' OR status='sending') AND next_attempt<=? AND attempts<10 ORDER BY next_attempt LIMIT 15`).bind(now).all<{event_id:string}>();
 for(const event of due.results){
 const claimed=await db.prepare(`UPDATE notification_outbox SET status='sending',attempts=attempts+1,next_attempt=? WHERE event_id=? AND status IN ('pending','sending') AND next_attempt<=? RETURNING attempts,project_id`).bind(now+120,event.event_id,now).first<{attempts:number;project_id:string}>();if(!claimed)continue;
 try{const row=await db.prepare(`SELECT c.telegram_chat_id,c.enabled,p.name,p.public_slug,g.kind,g.payload FROM client_credentials c JOIN projects p ON p.id=c.project_id JOIN guest_entries g ON g.project_id=c.project_id WHERE g.id=?`).bind(event.event_id).first<{telegram_chat_id:string|null;enabled:number;name:string;public_slug:string|null;kind:string;payload:string}>();
 if(!row?.enabled||!row.telegram_chat_id){await db.prepare("UPDATE notification_outbox SET status='pending',attempts=attempts-1,next_attempt=?,last_error='not_connected' WHERE event_id=?").bind(now+300,event.event_id).run();continue}
 await send(env,row.telegram_chat_id,notificationText(row.name,row.kind,JSON.parse(row.payload))+(row.public_slug&&env.PUBLIC_SITE_ORIGIN?'\nКабинет: '+env.PUBLIC_SITE_ORIGIN+'/s/'+row.public_slug+'/manage':''));
 await db.prepare("UPDATE notification_outbox SET status='sent',last_error='' WHERE event_id=?").bind(event.event_id).run();
 }catch(e){const retryAfter=(e as {retryAfter?:number}).retryAfter||Math.min(3600,30*2**claimed.attempts);await db.prepare('UPDATE notification_outbox SET status=?,next_attempt=?,last_error=? WHERE event_id=?').bind(claimed.attempts>=10?'failed':'pending',now+retryAfter,'delivery_failed',event.event_id).run()}
 }
 await db.prepare('DELETE FROM client_login_attempts WHERE expires<?').bind(now).run();
}

export async function ensureTelegramWebhook(env:Cloudflare.Env){
 if(!env.TELEGRAM_BOT_TOKEN||!env.TELEGRAM_BOT_USERNAME||!env.TELEGRAM_WEBHOOK_SECRET||!env.PUBLIC_SITE_ORIGIN)throw Error('Bot is not configured');
 const origin=new URL(env.PUBLIC_SITE_ORIGIN);if(origin.protocol!=='https:'||origin.origin!==env.PUBLIC_SITE_ORIGIN)throw Error('Invalid site origin');
 const target=origin.origin+'/api/telegram/webhook';
 async function call(method:string,body:object){const r=await fetch('https://api.telegram.org/bot'+env.TELEGRAM_BOT_TOKEN+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(12000)});const d=await r.json() as {ok:boolean;result:unknown};if(!r.ok||!d.ok)throw Error('Telegram setup failed');return d.result}
 const bot=await call('getMe',{}) as {username?:string};if(bot.username?.toLowerCase()!==env.TELEGRAM_BOT_USERNAME.replace('@','').toLowerCase())throw Error('Bot username does not match token');
 const info=await call('getWebhookInfo',{}) as {url?:string};if(info.url&&info.url!==target)throw Error('Bot already belongs to another site');
 await call('setWebhook',{url:target,secret_token:env.TELEGRAM_WEBHOOK_SECRET,allowed_updates:['message'],drop_pending_updates:false});
}
