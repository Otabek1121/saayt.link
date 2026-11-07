'use client';
import {publicLanguages,uiText,type PublicLanguage} from '../lib/public-i18n';
export default function LanguageSwitch({language,onChange}:{language:PublicLanguage;onChange:(language:PublicLanguage)=>void}){return <label className="public-language-switch"><span>{uiText(language,'Язык интерфейса')}</span><select aria-label={uiText(language,'Язык интерфейса')} value={language} onChange={e=>onChange(e.target.value as PublicLanguage)}>{publicLanguages.map(l=><option key={l.code} value={l.code} lang={l.code}>{l.label}</option>)}</select></label>}
