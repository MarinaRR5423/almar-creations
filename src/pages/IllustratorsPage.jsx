import React, { useState } from 'react'
import Nav from '../Nav.jsx'
import Footer from '../Footer.jsx'
import './IllustratorsPage.css'

const ILLUSTRATORS = [
  { id: 'marie',   name: 'Marie Dupont',     city: 'Lyon',        style: 'Acuarela',      styleDesc: 'Acuarela suave y detallada, influencias de la literatura clásica infantil', pill: '#C0DD97', avatar: '#EAF3DE', icon: '🎨' },
  { id: 'lucas',   name: 'Lucas Ferreira',   city: 'Bordeaux',    style: 'Geométrico',    styleDesc: 'Geométrico moderno y vectorial, colores vivos, fuertes contrastes',          pill: '#FAC775', avatar: '#FAEEDA', icon: '🔷' },
  { id: 'camille', name: 'Camille Moreau',   city: 'París',       style: 'Expresionista', styleDesc: 'Trazos espontáneos, emociones intensas, inspirado en el Fauvismo',           pill: '#F5C4B3', avatar: '#FAECE7', icon: '🖌️' },
  { id: 'sofia',   name: 'Sofia Petrov',     city: 'Estrasburgo', style: 'Minimalista',   styleDesc: 'Líneas limpias, paletas suaves, influencias escandinavas',                   pill: '#CECBF6', avatar: '#EEEDFE', icon: '✦'  },
  { id: 'antoine', name: 'Antoine Lebrun',   city: 'Toulouse',    style: 'Cómic',         styleDesc: 'Personajes expresivos, entintado preciso, colores saturados',                pill: '#B5D4F4', avatar: '#EBF4FD', icon: '💥' },
  { id: 'yasmine', name: 'Yasmine Ben Amor', city: 'Marsella',    style: 'Folk',          styleDesc: 'Motivos geométricos inspirados en la artesanía mediterránea y magrebí',      pill: '#F4C0D1', avatar: '#FDF0F4', icon: '🌸' },
]

export default function IllustratorsPage({ navigate }) {
  const [active, setActive] = useState(null)

  return (
    <div className="illus-page">
      <Nav navigate={navigate} currentPage="illustrators" />

      <header className="illus-hero">
        <div className="illus-hero-badge">🎨 Nuestros artistas</div>
        <h1>Los ilustradores<br /><em>detrás de la magia</em></h1>
        <p>Seis artistas apasionados de toda Europa, cada uno con un universo visual único.</p>
      </header>

      <section className="illus-grid-section">
        {ILLUSTRATORS.map(il => (
          <div key={il.id} id={il.id} className={`illus-card ${active === il.id ? 'expanded' : ''}`}>
            <div className="illus-card-top" onClick={() => setActive(active === il.id ? null : il.id)}>
              <div className="illus-avatar" style={{ background: il.avatar }}>
                <span>{il.icon}</span>
              </div>
              <div className="illus-card-info">
                <h2>{il.name}</h2>
                <p className="illus-city">📍 {il.city}</p>
                <span className="illus-pill" style={{ background: il.pill }}>{il.style}</span>
              </div>
              <span className="illus-chevron">{active === il.id ? '▲' : '▼'}</span>
            </div>

            {active === il.id && (
              <div className="illus-card-body">
                <p>{il.styleDesc}</p>
                <div className="illus-portfolio-placeholder">
                  <span>🖼️</span>
                  <span>Portfolio próximamente</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}
