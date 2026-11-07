import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {dirname,resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const manifest=JSON.parse(await readFile(resolve(root,'deployment/export-assets.json'),'utf8'));
for(const asset of manifest){
 const target=resolve(root,asset.path);
 if(!target.startsWith(root+'/public/'))throw new Error('Invalid asset path');
 const hash=b=>createHash('sha256').update(b).digest('hex');
 let current;try{current=await readFile(target)}catch{}
 if(current&&hash(current)===asset.sha256)continue;
 let encoded;try{encoded=await readFile(resolve(root,'deployment/asset-data',asset.path+'.b64'),'utf8')}catch{}
 if(encoded){const bytes=Buffer.from(encoded,'base64');if(hash(bytes)!==asset.sha256)throw new Error('Bundled checksum mismatch: '+asset.path);await mkdir(dirname(target),{recursive:true});await writeFile(target,bytes);continue;}
 const response=await fetch(asset.url,{signal:AbortSignal.timeout(60000)});
 if(!response.ok)throw new Error('Download failed: '+asset.path+' '+response.status);
 const bytes=Buffer.from(await response.arrayBuffer());
 if(hash(bytes)!==asset.sha256)throw new Error('Checksum mismatch: '+asset.path);
 await mkdir(dirname(target),{recursive:true});await writeFile(target,bytes);
 console.log('Restored '+asset.path);
}
