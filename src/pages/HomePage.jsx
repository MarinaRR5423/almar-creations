import React from 'react'
import { useLang } from '../LangContext.jsx'
import LangSwitcher from '../LangSwitcher.jsx'
import './HomePage.css'

const BOOK_IDS = ['nacimiento', 'cumpleanos', 'emociones', 'familia']
const BOOK_META = {
  nacimiento: { color: '#EAF3DE', stroke: '#C0DD97', icon: '🌱' },
  cumpleanos: { color: '#FAEEDA', stroke: '#FAC775', icon: '🎂' },
  emociones:  { color: '#FAECE7', stroke: '#F5C4B3', icon: '💛' },
  familia:    { color: '#EEEDFE', stroke: '#CECBF6', icon: '🏠' },
}

export default function HomePage({ onSelectBook }) {
  const { tr } = useLang()

  return (
    <div className="home">
      <nav className="home-nav">
        <span className="home-logo">Almar <em>Creations</em></span>
        <div className="home-nav-right">
          <LangSwitcher />
          <a href="mailto:hola@almarcreations.com" className="home-contact">{tr.nav.contact}</a>
          <button className="home-cart-btn" title="Carrito (próximamente)">🛒</button>
        </div>
      </nav>

      <header className="home-hero">
        <div className="home-hero-badge">{tr.hero.badge}</div>
        <h1>{tr.hero.title}<br /><em>{tr.hero.titleEm}</em></h1>
        <p>{tr.hero.desc}</p>
      </header>

      <section className="home-books">
        <h2>{tr.home.chooseCollection}</h2>
        <div className="home-books-grid">
          {BOOK_IDS.map(id => {
            const meta = BOOK_META[id]
            const book = tr.books[id]
            return (
              <button
                key={id}
                className="home-book-card"
                onClick={() => onSelectBook({ id, ...meta, ...book })}
              >
                <div className="home-book-cover" style={{ background: meta.color, borderColor: meta.stroke }}>
                  <span>{meta.icon}</span>
                </div>
                <div className="home-book-body">
                  <span className="home-book-label">{book.label}</span>
                  <h3>{book.title}</h3>
                  <p>{book.desc}</p>
                  <div className="home-book-footer">
                    <span className="home-book-price">{book.price}</span>
                    <span className="home-book-cta">{tr.home.customize}</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <section className="home-guarantees">
        <div className="home-guarantee">{tr.guarantees.delivery}</div>
        <div className="home-guarantee">{tr.guarantees.paper}</div>
        <div className="home-guarantee">{tr.guarantees.illustrated}</div>
        <div className="home-guarantee">{tr.guarantees.love}</div>
      </section>

      <footer className="home-footer">
        <span className="home-footer-logo">Almar <em>Creations</em></span>
        <span>© 2025 Almar Creations · {tr.footer}</span>
      </footer>
    </div>
  )
}
