const encode=(v:Uint8Array)=>Buffer.from(v).toString('base64url');
export const normalizedLogin=(v:string)=>v.trim().toLowerCase();
export async function hashPassword(password:string,salt=crypto.getRandomValues(new Uint8Array(16))){
 if(password.length<12||password.length>128)throw Error('Пароль: от 12 до 128 символов');
 const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
 const hash=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt,iterations:100000},key,256);
 return `pbkdf2-sha256$100000$${encode(salt)}$${encode(new Uint8Array(hash))}`;
}
export async function verifyPassword(password:string,stored:string){
 try{const [algorithm,iterations,salt,expected]=stored.split('$');if(algorithm!=='pbkdf2-sha256'||iterations!=='100000'||!salt||!expected)return false;
 const actual=(await hashPassword(password,new Uint8Array(Buffer.from(salt,'base64url')))).split('$')[3];
 const a=Buffer.from(actual,'base64url'),b=Buffer.from(expected,'base64url');if(a.length!==32||b.length!==32)return false;let diff=0;for(let i=0;i<32;i++)diff|=a[i]^b[i];return diff===0;
 }catch{return false}
}
export async function tokenHash(value:string){return encode(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))))}
export function randomToken(){return encode(crypto.getRandomValues(new Uint8Array(24)))}
