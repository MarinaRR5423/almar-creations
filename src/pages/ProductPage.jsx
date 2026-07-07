import React, { useState } from 'react'
import Wizard from '../Wizard.jsx'
import './ProductPage.css'

export default function ProductPage({ book, onBack }) {
  const [previewName, setPreviewName] = useState('')

  return (
    <div className="product-page">

      <nav className="product-nav">
        <span className="product-logo">Almar <em>Creations</em></span>
        <div className="product-nav-right">
          <button className="product-back-btn" onClick={onBack}>← Volver a los libros</button>
          <button className="product-cart-btn" title="Carrito (próximamente)">🛒</button>
        </div>
      </nav>

      <div className="product-layout">

        <div className="product-main">
          <div className="product-header">
            <div className="product-info">
              <span className="product-badge">{book.label}</span>
              <h1 className="product-title">
                {previewName
                  ? book.title.replace(/\[Nombre\]/gi, previewName).replace(/\[N\]/gi, '')
                  : book.title}
              </h1>
              <p className="product-desc">Personaliza cada detalle del personaje para crear un libro único.</p>
            </div>
            <div className="product-price">{book.price}</div>
          </div>

          <div className="product-wizard-intro">
            <h2>Personaliza tu libro ✨</h2>
            <p>Sigue los pasos para crear el personaje perfecto para tu historia</p>
          </div>

          <Wizard book={book.id} onNameChange={setPreviewName} />
        </div>

        <aside className="product-preview-col">
          <div className="product-book-preview">
            <div className="product-book-preview-inner">
              <div className="product-book-cover" style={{ background: `linear-gradient(135deg, ${book.stroke}, ${book.color})` }}>
                <div className="product-book-cover-icon">{book.icon}</div>
                <div className="product-book-cover-title">
                  {previewName
                    ? book.title.replace(/\[Nombre\]/gi, previewName).replace(/\[N\]/gi, '')
                    : book.title}
                </div>
                <div className="product-book-cover-name">
                  {previewName || 'Tu personaje'}
                </div>
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
              <div className="product-preview-label">Vista previa del libro</div>
            </div>
          </div>
        </aside>

      </div>

      <div className="product-guarantees">
        <div className="product-guarantee">📦 Entrega en 7 días</div>
        <div className="product-guarantee">🌿 Papel FSC certificado</div>
        <div className="product-guarantee">🎨 Ilustrado a mano</div>
        <div className="product-guarantee">💛 Hecho con amor</div>
      </div>

      <footer className="product-footer">
        <span className="product-footer-logo">Almar <em>Creations</em></span>
        <span>© 2025 Almar Creations · Todos los derechos reservados</span>
      </footer>

    </div>
  )
}
