import React from 'react'
import { useLang } from './LangContext.jsx'
import './LangSwitcher.css'

const FLAGS = {
  es: (
    <svg viewBox="0 0 20 14" width="22" height="16">
      <rect width="20" height="14" fill="#c60b1e"/>
      <rect y="3.5" width="20" height="7" fill="#ffc400"/>
    </svg>
  ),
  en: (
    <svg viewBox="0 0 60 30" width="22" height="16">
      <rect width="60" height="30" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  ),
  fr: (
    <svg viewBox="0 0 3 2" width="22" height="16">
      <rect width="1" height="2" fill="#002395"/>
      <rect x="1" width="1" height="2" fill="#fff"/>
      <rect x="2" width="1" height="2" fill="#ED2939"/>
    </svg>
  ),
}

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
          {FLAGS[l.code]}
        </button>
      ))}
    </div>
  )
}
