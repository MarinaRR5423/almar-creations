import React from 'react'
import './HomePage.css'

const BOOKS = [
  {
    id: 'nacimiento',
    label: 'Nacimiento',
    title: 'Bienvenido al mundo, [Nombre]',
    desc: 'Un libro tierno para celebrar la llegada de tu bebé, ilustrado con dulzura y personalizado con su nombre.',
    price: '34,90 €',
    color: '#EAF3DE',
    stroke: '#C0DD97',
    icon: '🌱',
  },
  {
    id: 'cumpleanos',
    label: 'Cumpleaños',
    title: '[Nombre] cumple [N] años',
    desc: 'Un libro lleno de magia y sorpresas para celebrar a tu hijo el día de su cumpleaños.',
    price: '32,90 €',
    color: '#FAEEDA',
    stroke: '#FAC775',
    icon: '🎂',
  },
  {
    id: 'emociones',
    label: 'Emociones',
    title: 'Cuando [Nombre] se frustra…',
    desc: 'Ayuda a tu hijo a entender y manejar la frustración con una historia dulce.',
    price: '29,90 €',
    color: '#FAECE7',
    stroke: '#F5C4B3',
    icon: '💛',
  },
  {
    id: 'familia',
    label: 'Familia',
    title: 'La familia de [Nombre]',
    desc: 'Celebra tu familia única — cada miembro ilustrado con amor.',
    price: '36,90 €',
    color: '#EEEDFE',
    stroke: '#CECBF6',
    icon: '🏠',
  },
]

export default function HomePage({ onSelectBook }) {
  return (
    <div className="home">
      <nav className="home-nav">
        <span className="home-logo">Almar <em>Creations</em></span>
        <div className="home-nav-right">
          <a href="mailto:hola@almarcreations.com" className="home-contact">Contacto</a>
          <button className="home-cart-btn" title="Carrito (próximamente)">
            🛒
          </button>
        </div>
      </nav>

      <header className="home-hero">
        <div className="home-hero-badge">📚 Libros personalizados</div>
        <h1>Cada niño merece<br /><em>su propia historia</em></h1>
        <p>Libros ilustrados a mano, personalizados con el nombre, aspecto y familia de tu peque.</p>
      </header>

      <section className="home-books">
        <h2>Elige tu colección</h2>
        <div className="home-books-grid">
          {BOOKS.map(book => (
            <button
              key={book.id}
              className="home-book-card"
              style={{ '--color': book.color, '--stroke': book.stroke }}
              onClick={() => onSelectBook(book)}
            >
              <div className="home-book-cover" style={{ background: book.color, borderColor: book.stroke }}>
                <span>{book.icon}</span>
              </div>
              <div className="home-book-body">
                <span className="home-book-label">{book.label}</span>
                <h3>{book.title}</h3>
                <p>{book.desc}</p>
                <div className="home-book-footer">
                  <span className="home-book-price">{book.price}</span>
                  <span className="home-book-cta">Personalizar →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="home-guarantees">
        <div className="home-guarantee">📦 Entrega en 7 días</div>
        <div className="home-guarantee">🌿 Papel FSC certificado</div>
        <div className="home-guarantee">🎨 Ilustrado a mano</div>
        <div className="home-guarantee">💛 Hecho con amor</div>
      </section>

      <footer className="home-footer">
        <span className="home-footer-logo">Almar <em>Creations</em></span>
        <span>© 2025 Almar Creations · Todos los derechos reservados</span>
      </footer>
    </div>
  )
}
