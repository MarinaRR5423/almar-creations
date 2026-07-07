import React from 'react'
import { useLang } from './LangContext.jsx'
import './LangSwitcher.css'

export default function LangSwitcher() {
  const { lang, setLang, LANGUAGES } = useLang()
  return (
    <div className="lang-switcher">
      {LANGUAGES.map(l => (
        <button
          key={l.code}
          className={`lang-btn ${lang === l.code ? 'active' : ''}`}
          onClick={() => setLang(l.code)}
        >
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  )
}
