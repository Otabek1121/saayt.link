'use client';
import {useEffect,useState} from 'react';import {LANGUAGE_COOKIE,publicLanguage,languageUrl,type PublicLanguage} from '../lib/public-i18n';
export function usePublicLanguage(initialLanguage:PublicLanguage='ru'){
 const [language,setLanguage]=useState(initialLanguage);
 useEffect(()=>{const query=publicLanguage(new URL(location.href).searchParams.get('lang'));if(query)setLanguage(query);else if(!document.cookie.split(';').some(c=>c.trim().startsWith(LANGUAGE_COOKIE+'='))){try{const saved=publicLanguage(localStorage.getItem(LANGUAGE_COOKIE));if(saved)setLanguage(saved)}catch{}}},[]);
 useEffect(()=>{document.documentElement.lang=language;document.cookie=`${LANGUAGE_COOKIE}=${language}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`;try{localStorage.setItem(LANGUAGE_COOKIE,language)}catch{}},[language]);
 function changeLanguage(next:PublicLanguage){setLanguage(next);history.replaceState(history.state,'',languageUrl(location.pathname+location.search+location.hash,next))}
 return {language,changeLanguage,href:(path:string)=>languageUrl(path,language)};
}
