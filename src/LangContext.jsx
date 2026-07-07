import React, { createContext, useContext, useState } from 'react'
import { t, LANGUAGES } from './i18n.js'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('es')
  return (
    <LangContext.Provider value={{ lang, setLang, tr: t[lang], LANGUAGES }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
