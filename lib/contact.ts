import type {Spec} from './spec';
export const phoneNumber=(value:string)=>{const digits=value.replace(/\D/g,'');return digits.length>=5?(value.trim().startsWith('+')?'+':'')+digits:''};
export function contactAction(s:Spec){if(s.action==='call'&&phoneNumber(s.phone))return 'tel:'+phoneNumber(s.phone);if(s.action==='whatsapp'&&phoneNumber(s.whatsapp))return 'https://wa.me/'+phoneNumber(s.whatsapp).replace(/\D/g,'');if(s.action==='telegram'&&s.telegram.replace('@',''))return 'https://t.me/'+s.telegram.replace('@','');return '#contacts'}
