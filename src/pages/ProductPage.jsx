import React, { useState } from 'react'
import { useLang } from '../LangContext.jsx'
import LangSwitcher from '../LangSwitcher.jsx'
import Wizard from '../Wizard.jsx'
import './ProductPage.css'

export default function ProductPage({ book, onBack }) {
  const { tr } = useLang()
  const [previewName, setPreviewName] = useState('')

  const displayTitle = previewName
    ? book.title.replace(/\[Nombre\]|\[Name\]|\[Prénom\]/gi, previewName).replace(/\[N\]/gi, '')
    : book.title

  return (
    <div className="product-page">

      <nav className="product-nav">
        <span className="product-logo" onClick={onBack} style={{ cursor: 'pointer' }}>Almar <em>Creations</em></span>
        <div className="product-nav-right">
          <LangSwitcher />
          <button className="product-back-btn" onClick={onBack}>{tr.nav.back}</button>
          <button className="product-cart-btn" title="Carrito (próximamente)">🛒</button>
        </div>
      </nav>

      <div className="product-layout">

        <div className="product-main">
          <div className="product-header">
            <div className="product-info">
              <span className="product-badge">{book.label}</span>
              <h1 className="product-title">{displayTitle}</h1>
              <p className="product-desc">{tr.product.desc}</p>
            </div>
            <div className="product-price">{book.price}</div>
          </div>

          <div className="product-wizard-intro">
            <h2>{tr.product.wizardTitle}</h2>
            <p>{tr.product.wizardDesc}</p>
          </div>

          <Wizard book={book.id} onNameChange={setPreviewName} />
        </div>

        <aside className="product-preview-col">
          <div className="product-book-preview">
            <div className="product-book-preview-inner">
              <div className="product-book-cover" style={{ background: `linear-gradient(135deg, ${book.stroke}, ${book.color})` }}>
                <div className="product-book-cover-icon">{book.icon}</div>
                <div className="product-book-cover-title">{displayTitle}</div>
                <div className="product-book-cover-name">{previewName || 'Tu personaje'}</div>
              </div>
              <div className="product-book-pages">
                <div className="product-book-page">
                  <span className="product-page-icon">🌟</span>
                  <span className="product-page-text">
                    Érase una vez <strong>{previewName || 'un personaje'}</strong> muy especial...
                  </span>
                </div>
                <div className="product-book-page">
                  <span className="product-page-icon">🎨</span>
                  <span className="product-page-text">Con su familia vivió grandes aventuras...</span>
                </div>
              </div>
              <div className="product-preview-label">{tr.product.previewLabel}</div>
            </div>
          </div>
        </aside>

      </div>

      <div className="product-guarantees">
        <div className="product-guarantee">{tr.guarantees.delivery}</div>
        <div className="product-guarantee">{tr.guarantees.paper}</div>
        <div className="product-guarantee">{tr.guarantees.illustrated}</div>
        <div className="product-guarantee">{tr.guarantees.love}</div>
      </div>

      <footer className="product-footer">
        <span className="product-footer-logo">Almar <em>Creations</em></span>
        <span>© 2025 Almar Creations · {tr.footer}</span>
      </footer>

    </div>
  )
}
