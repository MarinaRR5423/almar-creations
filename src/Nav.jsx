import React, { useState } from 'react'
import { useLang } from './LangContext.jsx'
import LangSwitcher from './LangSwitcher.jsx'
import './Nav.css'

export default function Nav({ navigate, currentPage }) {
  const { tr } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { id: 'home',         label: tr.nav.home },
    { id: 'books',        label: tr.nav.books },
    { id: 'illustrators', label: tr.nav.illustrators },
    { id: 'about',        label: tr.nav.about },
    { id: 'contact',      label: tr.nav.contact },
  ]

  return (
    <nav className="main-nav">
      <span className="main-nav-logo" onClick={() => navigate('home')}>
        Almar <em>Creations</em>
      </span>

      <div className={`main-nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <button
            key={l.id}
            className={`main-nav-link ${currentPage === l.id ? 'active' : ''}`}
            onClick={() => { navigate(l.id); setMenuOpen(false) }}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="main-nav-right">
        <LangSwitcher />
        <button className="main-nav-cart" title="Carrito (próximamente)">🛒</button>
        <button className="main-nav-burger" onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  )
}
