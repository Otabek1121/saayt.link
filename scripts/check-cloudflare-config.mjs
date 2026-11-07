import {readFileSync} from 'node:fs';
const config=JSON.parse(readFileSync(new URL('../wrangler.jsonc',import.meta.url),'utf8'));
if(config.d1_databases.some(x=>x.database_id==='00000000-0000-4000-8000-000000000000'))throw Error('Set the real Cloudflare D1 database_id in wrangler.jsonc before deploying.');
if(config.vars.AUTH_PROVIDER!=='google')throw Error('Independent hosting requires verified Google authentication.');
console.log('Cloudflare resource configuration is ready.');
