import React from 'react'
import Nav from '../Nav.jsx'
import Footer from '../Footer.jsx'
import './AboutPage.css'

export default function AboutPage({ navigate }) {
  return (
    <div className="about-page">
      <Nav navigate={navigate} currentPage="about" />

      <header className="about-hero">
        <div className="about-badge">💛 Nuestra historia</div>
        <h1>Creado con amor,<br /><em>pensado para siempre</em></h1>
      </header>

      <section className="about-content">
        <div className="about-block">
          <div className="about-icon">📚</div>
          <div>
            <h2>¿Quiénes somos?</h2>
            <p>Almar Creations nació de la convicción de que cada niño merece ver su historia reflejada en las páginas de un libro. Somos un pequeño equipo apasionado por la literatura infantil y el arte ilustrado.</p>
          </div>
        </div>

        <div className="about-block">
          <div className="about-icon">🎨</div>
          <div>
            <h2>Nuestro proceso</h2>
            <p>Cada libro es creado en colaboración con ilustradores profesionales de toda Europa. Tú eliges el artista, personalizas el personaje y nosotros nos encargamos del resto — impresión artesanal, papel FSC certificado, encuadernación de calidad.</p>
          </div>
        </div>

        <div className="about-block">
          <div className="about-icon">🌱</div>
          <div>
            <h2>Nuestros valores</h2>
            <p>Sostenibilidad, diversidad e inclusión guían cada decisión. Nuestros libros celebran familias de todos los tipos y personajes de todos los orígenes — porque cada historia merece ser contada.</p>
          </div>
        </div>
      </section>

      <div className="about-cta">
        <button className="about-cta-btn" onClick={() => navigate('home')}>Descubrir los libros →</button>
      </div>

      <Footer navigate={navigate} />
    </div>
  )
}
