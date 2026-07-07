import React, { useState } from 'react'
import Nav from '../Nav.jsx'
import Footer from '../Footer.jsx'
import './ContactPage.css'

export default function ContactPage({ navigate }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = `Hola, soy ${form.name} (${form.email}).\n\n${form.message}`
    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(msg)}`, '_blank')
    setSent(true)
  }

  return (
    <div className="contact-page">
      <Nav navigate={navigate} currentPage="contact" />

      <header className="contact-hero">
        <div className="contact-badge">💬 Hablemos</div>
        <h1>¿Tienes alguna<br /><em>pregunta?</em></h1>
        <p>Estamos aquí para ayudarte a crear el libro perfecto.</p>
      </header>

      <section className="contact-body">
        <div className="contact-info">
          <div className="contact-info-item">
            <span>📧</span>
            <div>
              <strong>Email</strong>
              <a href="mailto:hola@almarcreations.com">hola@almarcreations.com</a>
            </div>
          </div>
          <div className="contact-info-item">
            <span>💬</span>
            <div>
              <strong>WhatsApp</strong>
              <a href="https://wa.me/34600000000" target="_blank" rel="noopener noreferrer">+34 600 000 000</a>
            </div>
          </div>
          <div className="contact-info-item">
            <span>⏱️</span>
            <div>
              <strong>Tiempo de respuesta</strong>
              <span>Menos de 24 horas</span>
            </div>
          </div>
        </div>

        <div className="contact-form-wrap">
          {sent ? (
            <div className="contact-thanks">
              <span>🎉</span>
              <h2>¡Mensaje enviado!</h2>
              <p>Te responderemos en menos de 24 horas.</p>
              <button onClick={() => navigate('home')}>Volver al inicio</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-field">
                <label>Nombre</label>
                <input type="text" required placeholder="Tu nombre"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="contact-field">
                <label>Email</label>
                <input type="email" required placeholder="tu@email.com"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="contact-field">
                <label>Mensaje</label>
                <textarea required rows={5} placeholder="¿En qué podemos ayudarte?"
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <button type="submit" className="contact-submit">Enviar por WhatsApp →</button>
            </form>
          )}
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}
