import React from 'react'
import { useLang } from './LangContext.jsx'
import 'flag-icons/css/flag-icons.min.css'
import './LangSwitcher.css'

const FLAG_CODES = { es: 'es', en: 'gb', fr: 'fr' }

export default function LangSwitcher() {
  const { lang, setLang, LANGUAGES } = useLang()
  return (
    <div className="lang-switcher">
      {LANGUAGES.map(l => (
        <button
          key={l.code}
          className={`lang-btn ${lang === l.code ? 'active' : ''}`}
          onClick={() => setLang(l.code)}
          title={l.label}
        >
          <span className={`fi fi-${FLAG_CODES[l.code]}`} />
        </button>
      ))}
    </div>
  )
}
