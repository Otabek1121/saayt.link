// Incremental logical snapshots. D1 Time Travel remains the source for atomic point-in-time recovery.
type Table={name:string;sql:string};
export type BackupState={day:string;started:string;completed?:string;phase:'tables'|'assets'|'manifest'|'complete';table:number;offset:number;assetCursor:string|null;tables:Table[];indexes:Table[];parts:{key:string;table:string;rows:number;sha256:string}[];assets:number;error?:string};
export async function backupState(env:Cloudflare.Env){return env.BUCKET?await (await env.BUCKET.get('backups/state.json'))?.json<BackupState>()||null:null}
const identifier=(s:string)=>{if(!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s))throw Error('Invalid backup table');return '"'+s+'"'};
export async function backupTick(env:Cloudflare.Env){
 if(!env.DB||!env.BUCKET)return;const db=env.DB,bucket=env.BUCKET,lease=Math.floor(Date.now()/1000)+120;const permit=await db.prepare("INSERT INTO client_login_attempts(key,attempts,expires) VALUES('backup-lease',1,?) ON CONFLICT(key) DO UPDATE SET expires=excluded.expires WHERE expires<=? RETURNING key").bind(lease,Math.floor(Date.now()/1000)).first();if(!permit)return;try{const day=new Date().toISOString().slice(0,10);let state=await backupState(env);
 if(state?.completed&&state.day===day)return;
 if(!state||state.completed){const schema=await db.prepare("SELECT name,sql,type FROM sqlite_schema WHERE type IN ('table','index') AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_cf_%' AND name NOT LIKE 'd1_%' AND sql IS NOT NULL ORDER BY name").all<Table&{type:string}>();const tables=schema.results.filter(t=>t.type==='table'),indexes=schema.results.filter(t=>t.type==='index');state={day,started:new Date().toISOString(),phase:'tables',table:0,offset:0,assetCursor:null,tables,indexes,parts:[],assets:0};await bucket.put('backups/state.json',JSON.stringify(state))}
 try{
 if(state.phase==='tables'){
  const table=state.tables[state.table];if(!table){state.phase='assets'}else{
   const result=await db.prepare('SELECT * FROM '+identifier(table.name)+' ORDER BY rowid LIMIT 10 OFFSET ?').bind(state.offset).all<Record<string,unknown>>();
   if(result.results.length){const body=JSON.stringify(result.results),hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(body));const key=`backups/${state.day}/tables/${table.name}/${String(state.offset).padStart(10,'0')}.json`;await bucket.put(key,body,{httpMetadata:{contentType:'application/json'}});state.parts.push({key,table:table.name,rows:result.results.length,sha256:Array.from(new Uint8Array(hash),b=>b.toString(16).padStart(2,'0')).join('')});state.offset+=result.results.length}
   if(result.results.length<10){state.table++;state.offset=0}
  }
 }else if(state.phase==='assets'){
  const page=await bucket.list({prefix:'media/',limit:10,...(state.assetCursor?{cursor:state.assetCursor}:{})});for(const obj of page.objects){const target='backups/assets/'+obj.key;if(!await bucket.head(target)){const source=await bucket.get(obj.key);if(!source)throw Error('Missing source media');await bucket.put(target,source.body,{httpMetadata:source.httpMetadata})}}state.assets+=page.objects.length;state.assetCursor=page.truncated?page.cursor:null;if(!page.truncated)state.phase='manifest';
 }
 if(state.phase==='manifest'){const complete:BackupState={...state,phase:'complete',completed:new Date().toISOString()};delete complete.error;await bucket.put(`backups/${state.day}/manifest.json`,JSON.stringify({...complete,consistency:'Logical copy across multiple reads. Use D1 Time Travel for atomic recovery.'}),{httpMetadata:{contentType:'application/json'}});state=complete}
 delete state.error;await bucket.put('backups/state.json',JSON.stringify(state));
 }catch(e){state.error='Не удалось завершить этап. Повтор при следующем запуске.';await bucket.put('backups/state.json',JSON.stringify(state));console.error(JSON.stringify({event:'backup_failed',day:state.day,phase:state.phase}));throw e}
}finally{await db.prepare("UPDATE client_login_attempts SET expires=0 WHERE key='backup-lease' AND expires=?").bind(lease).run()}
}
