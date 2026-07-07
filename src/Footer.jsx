import React from 'react'
import { useLang } from './LangContext.jsx'
import './Footer.css'

export default function Footer({ navigate }) {
  const { tr } = useLang()
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span className="site-footer-logo" onClick={() => navigate('home')}>Almar <em>Creations</em></span>
        <div className="site-footer-links">
          <button onClick={() => navigate('home')}>{tr.nav.home}</button>
          <button onClick={() => navigate('books')}>{tr.nav.books}</button>
          <button onClick={() => navigate('illustrators')}>{tr.nav.illustrators}</button>
          <button onClick={() => navigate('about')}>{tr.nav.about}</button>
          <button onClick={() => navigate('contact')}>{tr.nav.contact}</button>
        </div>
        <span>© 2025 Almar Creations · {tr.footer}</span>
      </div>
    </footer>
  )
}
