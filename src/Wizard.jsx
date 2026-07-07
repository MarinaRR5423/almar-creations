import React, { useState, useEffect } from 'react'
import './Wizard.css'

const BASE = import.meta.env.BASE_URL + 'assets/character/'

const ILLUSTRATORS = [
  { id: 'marie',   name: 'Marie Dupont',     city: 'Lyon',        style: 'Acuarela',     styleDesc: 'Acuarela suave y detallada, influencias de la literatura clásica infantil', pill: '#C0DD97', avatar: '#EAF3DE', icon: '🎨' },
  { id: 'lucas',   name: 'Lucas Ferreira',   city: 'Bordeaux',    style: 'Geométrico',   styleDesc: 'Geométrico moderno y vectorial, colores vivos, fuertes contrastes',          pill: '#FAC775', avatar: '#FAEEDA', icon: '🔷' },
  { id: 'camille', name: 'Camille Moreau',   city: 'París',       style: 'Expresionista',styleDesc: 'Trazos espontáneos, emociones intensas, inspirado en el Fauvismo',           pill: '#F5C4B3', avatar: '#FAECE7', icon: '🖌️' },
  { id: 'sofia',   name: 'Sofia Petrov',     city: 'Estrasburgo', style: 'Minimalista',  styleDesc: 'Líneas limpias, paletas suaves, influencias escandinavas',                   pill: '#CECBF6', avatar: '#EEEDFE', icon: '✦'  },
  { id: 'antoine', name: 'Antoine Lebrun',   city: 'Toulouse',    style: 'Cómic',        styleDesc: 'Personajes expresivos, entintado preciso, colores saturados',                pill: '#B5D4F4', avatar: '#EBF4FD', icon: '💥' },
  { id: 'yasmine', name: 'Yasmine Ben Amor', city: 'Marsella',    style: 'Folk',         styleDesc: 'Motivos geométricos inspirados en la artesanía mediterránea y magrebí',      pill: '#F4C0D1', avatar: '#FDF0F4', icon: '🌸' },
]

const SKIN_TONES   = [{ id: 'claro', label: 'Claro', color: '#FDDBB4' }, { id: 'medio', label: 'Medio', color: '#E8A87C' }, { id: 'olivaceo', label: 'Oliváceo', color: '#C68642' }, { id: 'oscuro', label: 'Oscuro', color: '#8D5524' }]
const OUTFIT_COLORS= [{ id: 'verde', label: 'Verde', color: '#A8C96B' }, { id: 'azul', label: 'Azul', color: '#7EC8E3' }, { id: 'morado', label: 'Morado', color: '#9B59B6' }, { id: 'rosa', label: 'Rosa', color: '#F4A7C3' }, { id: 'naranja', label: 'Naranja', color: '#E8894A' }, { id: 'amarillo', label: 'Amarillo', color: '#F5D77E' }]
const HAIR_COLORS  = [{ id: 'negro', label: 'Negro', color: '#1A1008', pngId: 'morado' }, { id: 'castano', label: 'Castaño', color: '#6B3A2A', pngId: 'verde' }, { id: 'rubio', label: 'Rubio', color: '#D4B483', pngId: 'amarillo' }, { id: 'pelirrojo', label: 'Pelirrojo', color: '#B05A28', pngId: 'naranja' }, { id: 'gris', label: 'Gris / Canas', color: '#9A9A9A', pngId: 'azul' }, { id: 'rosa', label: 'Rosa', color: '#E89BB5', pngId: 'rosa' }]
const EYE_COLORS   = [{ id: 'marron', label: 'Marrón', color: '#5C3317' }, { id: 'avellana', label: 'Avellana', color: '#8B6320' }, { id: 'verde', label: 'Verde', color: '#3D6B4A' }, { id: 'azul', label: 'Azul', color: '#2E6DA4' }, { id: 'gris', label: 'Gris', color: '#6B7A8D' }, { id: 'negro', label: 'Negro', color: '#1A1008' }]

const ADULT_SKIN_TONES = [{ id: 'claro', label: 'Claro', color: '#FDDBB4' }, { id: 'medio', label: 'Medio', color: '#E8A87C' }, { id: 'oscuro', label: 'Oscuro', color: '#8D5524' }]
const ADULT_HAIR_COLORS= [{ id: 'rubio', label: 'Rubio', color: '#D4B483' }, { id: 'naranja', label: 'Pelirrojo', color: '#C0652B' }, { id: 'castano', label: 'Castaño', color: '#6B3A2A' }, { id: 'marron', label: 'Marrón', color: '#3A1F10' }]
const ADULT_F_OUTFIT   = [{ id: 'naranja', label: 'Naranja', color: '#E8894A' }, { id: 'amarillo', label: 'Amarillo', color: '#F5D77E' }, { id: 'azul', label: 'Azul', color: '#7EC8E3' }, { id: 'verde', label: 'Verde', color: '#A8C96B' }, { id: 'rojo', label: 'Rojo', color: '#C0392B' }, { id: 'morado', label: 'Morado', color: '#9B59B6' }, { id: 'rosa', label: 'Rosa', color: '#D4859A' }]
const ADULT_M_OUTFIT   = [{ id: 'amarillo', label: 'Amarillo', color: '#F5D77E' }, { id: 'rojo', label: 'Rojo', color: '#C0392B' }, { id: 'verde', label: 'Verde', color: '#A8C96B' }, { id: 'morado', label: 'Morado', color: '#9B59B6' }, { id: 'malva', label: 'Malva', color: '#D4859A' }]
const ADULT_EYE_COLORS = [{ id: 'marron', label: 'Marrón', color: '#6B3A2A' }, { id: 'verde', label: 'Verde', color: '#4CAF50' }]

const AGES        = [{ id: 'bebe', label: 'Bebé', range: '0-2' }, { id: 'pequeno', label: 'Pequeño', range: '3-5' }, { id: 'nino', label: 'Niño/a', range: '6-8' }, { id: 'mayor', label: 'Mayor', range: '9-12' }]
const ACCESSORIES = [{ id: 'gafas', label: 'Gafas', icon: '👓' }, { id: 'gorra', label: 'Gorra', icon: '🧢' }, { id: 'diadema', label: 'Diadema', icon: '👑' }, { id: 'mochila', label: 'Mochila', icon: '🎒' }, { id: 'lazo', label: 'Lazo', icon: '🎀' }]
const FAMILY_OPTIONS = [{ id: 'mama_papa', label: 'Mamá y Papá', icon: '👩👨' }, { id: 'dos_mamas', label: 'Dos mamás', icon: '👩👩' }, { id: 'dos_papas', label: 'Dos papás', icon: '👨👨' }, { id: 'solo_mama', label: 'Solo mamá', icon: '👩' }, { id: 'solo_papa', label: 'Solo papá', icon: '👨' }, { id: 'sin_padres', label: 'Sin padres', icon: '✖️' }]
const PETS        = [{ id: 'perro', label: 'Perro', icon: '🐶' }, { id: 'gato', label: 'Gato', icon: '🐱' }, { id: 'conejo', label: 'Conejo', icon: '🐰' }, { id: 'pajaro', label: 'Pájaro', icon: '🐦' }, { id: 'ninguno', label: 'Sin mascota', icon: '✖️' }]

const STEPS = [
  { id: 'ilustrador',   label: 'Ilustrador',   icon: '🎨' },
  { id: 'nombre',       label: 'Nombre',       icon: '✏️' },
  { id: 'genero',       label: 'Género',       icon: '👦' },
  { id: 'aspecto',      label: 'Aspecto',      icon: '✨' },
  { id: 'complementos', label: 'Complementos', icon: '🎒' },
  { id: 'familia',      label: 'Familia',      icon: '👨‍👩‍👧' },
  { id: 'preview',      label: 'Preview',      icon: '🎉' },
]

function getAdultSlots(family) {
  switch (family) {
    case 'mama_papa':  return [{ key: 'adult1', label: 'Mamá', gender: 'f' }, { key: 'adult2', label: 'Papá', gender: 'm' }]
    case 'dos_mamas':  return [{ key: 'adult1', label: 'Mamá 1', gender: 'f' }, { key: 'adult2', label: 'Mamá 2', gender: 'f' }]
    case 'dos_papas':  return [{ key: 'adult1', label: 'Papá 1', gender: 'm' }, { key: 'adult2', label: 'Papá 2', gender: 'm' }]
    case 'solo_mama':  return [{ key: 'adult1', label: 'Mamá', gender: 'f' }]
    case 'solo_papa':  return [{ key: 'adult1', label: 'Papá', gender: 'm' }]
    default:           return []
  }
}

const defaultCharacter = {
  illustrator: '', name: '', gender: 'nina', age: 'nino',
  skinTone: 'claro', hairColor: 'castano', outfitColor: 'rosa', eyeColor: 'marron',
  accessories: [], family: 'mama_papa', pet: 'ninguno',
  adult1: { skinTone: 'claro', hairColor: 'marron', outfitColor: 'naranja', eyeColor: 'marron' },
  adult2: { skinTone: 'claro', hairColor: 'marron', outfitColor: 'amarillo', eyeColor: 'marron' },
}

export default function Wizard({ book, onNameChange }) {
  const [step, setStep]           = useState(0)
  const [character, setCharacter] = useState({ ...defaultCharacter, book: book || '' })

  const set = (key, value) => setCharacter(prev => ({ ...prev, [key]: value }))
  const setAdult = (which, key, value) => setCharacter(prev => ({ ...prev, [which]: { ...prev[which], [key]: value } }))
  const toggleAccessory = (id) => setCharacter(prev => ({
    ...prev,
    accessories: prev.accessories.includes(id) ? prev.accessories.filter(a => a !== id) : [...prev.accessories, id],
  }))

  useEffect(() => {
    onNameChange?.(character.name)
  }, [character.name])

  const canNext = () => {
    if (step === 0) return !!character.illustrator
    if (step === 1) return !!character.name.trim()
    return true
  }

  const handleSendWhatsApp = () => {
    const ill  = ILLUSTRATORS.find(i => i.id === character.illustrator)
    const skin = SKIN_TONES.find(s => s.id === character.skinTone)?.label
    const hair = HAIR_COLORS.find(h => h.id === character.hairColor)?.label
    const eyes = EYE_COLORS.find(e => e.id === character.eyeColor)?.label
    const outfit = OUTFIT_COLORS.find(o => o.id === character.outfitColor)?.label
    const fam  = FAMILY_OPTIONS.find(f => f.id === character.family)?.label
    const pet  = PETS.find(p => p.id === character.pet)?.label
    const acc  = character.accessories.length ? character.accessories.join(', ') : 'Ninguno'

    const msg = `¡Hola! Quiero pedir un libro personalizado de Almar Creations 📚\n\n` +
      `📖 Libro: ${book}\n` +
      `🎨 Ilustrador: ${ill?.name}\n` +
      `👶 Nombre: ${character.name}\n` +
      `👤 Género: ${character.gender} · Edad: ${character.age}\n` +
      `🎨 Piel: ${skin} · Pelo: ${hair} · Ojos: ${eyes}\n` +
      `👗 Ropa: ${outfit}\n` +
      `🎒 Complementos: ${acc}\n` +
      `👨‍👩‍👧 Familia: ${fam}\n` +
      `🐾 Mascota: ${pet}\n`

    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const selectedIllustrator = ILLUSTRATORS.find(i => i.id === character.illustrator)

  return (
    <div className="almar-wizard">
      <div className="almar-progress">
        <div className="almar-progress-bar">
          <div className="almar-progress-fill" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
        </div>
        <div className="almar-steps-dots">
          {STEPS.map((s, i) => (
            <div key={s.id} className={`almar-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
              onClick={() => i < step && setStep(i)} title={s.label}>
              <div className="almar-dot-circle">{i < step ? '✓' : s.icon}</div>
              <div className="almar-dot-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="almar-body">
        {step >= 1 && (
          <div className="almar-preview-panel">
            <CharacterPreview character={character} />
            <div className="almar-name-tag">{character.name || '¿Cómo me llamo?'}</div>
            {selectedIllustrator && (
              <div className="almar-illus-badge">
                {selectedIllustrator.icon} {selectedIllustrator.name}
                <span className="almar-illus-badge-style">{selectedIllustrator.style}</span>
              </div>
            )}
          </div>
        )}

        <div className="almar-content-panel" style={{ flex: step === 0 ? '1' : undefined }}>
          {step === 0 && <StepIllustrator character={character} set={set} />}
          {step === 1 && <StepName character={character} set={set} />}
          {step === 2 && <StepGenderAge character={character} set={set} />}
          {step === 3 && <StepAppearance character={character} set={set} />}
          {step === 4 && <StepAccessories character={character} toggleAccessory={toggleAccessory} />}
          {step === 5 && <StepFamily character={character} set={set} setAdult={setAdult} />}
          {step === 6 && <StepPreview character={character} selectedIllustrator={selectedIllustrator} onSend={handleSendWhatsApp} />}
        </div>
      </div>

      <div className="almar-nav">
        {step > 0 && <button className="almar-btn back" onClick={() => setStep(s => s - 1)}>← Volver</button>}
        {step < STEPS.length - 1 && (
          <button className="almar-btn next" onClick={() => setStep(s => s + 1)} disabled={!canNext()}>
            Siguiente →
          </button>
        )}
      </div>
    </div>
  )
}

function StepIllustrator({ character, set }) {
  const [popup, setPopup] = React.useState(null)
  return (
    <div className="almar-step wide">
      <h2>¿Quién ilustrará tu libro? 🎨</h2>
      <p>Seis artistas apasionados, seis universos distintos — elige el estilo que te enamora</p>
      <div className="almar-illus-grid">
        {ILLUSTRATORS.map(il => (
          <button key={il.id} className={`almar-illus-card ${character.illustrator === il.id ? 'selected' : ''}`}
            onClick={() => set('illustrator', il.id)}>
            <div className="almar-illus-avatar" style={{ background: il.avatar }}>
              <span style={{ fontSize: 28 }}>{il.icon}</span>
            </div>
            <div className="almar-illus-info">
              <p className="almar-illus-name">{il.name}</p>
              <p className="almar-illus-city">{il.city}</p>
              <span className="almar-style-pill" style={{ background: il.pill }}>{il.style}</span>
              <p className="almar-illus-desc">{il.styleDesc}</p>
            </div>
            <span className="almar-illus-info-btn" onClick={e => { e.stopPropagation(); setPopup(il) }}>i</span>
          </button>
        ))}
      </div>
      {popup && (
        <div className="almar-popup-overlay" onClick={() => setPopup(null)}>
          <div className="almar-popup" onClick={e => e.stopPropagation()}>
            <button className="almar-popup-close" onClick={() => setPopup(null)}>✕</button>
            <div className="almar-popup-avatar" style={{ background: popup.avatar }}>
              <span style={{ fontSize: 40 }}>{popup.icon}</span>
            </div>
            <h3 className="almar-popup-title">¿Conoces a <span style={{ color: '#E07B39' }}>{popup.name.split(' ')[0]}</span>?</h3>
            <p className="almar-popup-city">{popup.city}</p>
            <span className="almar-style-pill" style={{ background: popup.pill, fontSize: 12, padding: '4px 12px' }}>{popup.style}</span>
            <p className="almar-popup-desc">{popup.styleDesc}</p>
            <div className="almar-popup-actions">
              <a className="almar-popup-link" href={`/ilustradores#${popup.id}`} target="_blank" rel="noopener noreferrer">Ver portfolio →</a>
              <button className="almar-popup-choose" onClick={() => { set('illustrator', popup.id); setPopup(null) }}>
                Elegir a {popup.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StepName({ character, set }) {
  return (
    <div className="almar-step">
      <h2>¿Cómo se llama el protagonista? 🌟</h2>
      <p>Este nombre aparecerá en todas las páginas del libro</p>
      <input className="almar-name-input" type="text" placeholder="Escribe el nombre aquí..."
        value={character.name} onChange={e => set('name', e.target.value)} maxLength={20} autoFocus />
      <div className="almar-hint">{character.name.length}/20 caracteres</div>
    </div>
  )
}

function StepGenderAge({ character, set }) {
  return (
    <div className="almar-step">
      <h2>¿Quién es {character.name || 'el protagonista'}? 👦👧</h2>
      <div className="almar-section">
        <h3>Género</h3>
        <div className="almar-options-row">
          {[{ id: 'nino', label: 'Niño', icon: '👦' }, { id: 'nina', label: 'Niña', icon: '👧' }, { id: 'neutro', label: 'Neutro', icon: '🧒' }].map(g => (
            <button key={g.id} className={`almar-card ${character.gender === g.id ? 'selected' : ''}`} onClick={() => set('gender', g.id)}>
              <span className="almar-card-icon">{g.icon}</span><span>{g.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="almar-section">
        <h3>Edad</h3>
        <div className="almar-options-row">
          {AGES.map(a => (
            <button key={a.id} className={`almar-card ${character.age === a.id ? 'selected' : ''}`} onClick={() => set('age', a.id)}>
              <span className="almar-card-range">{a.range} años</span><span>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepAppearance({ character, set }) {
  return (
    <div className="almar-step">
      <h2>¿Cómo es {character.name || 'el protagonista'}? ✨</h2>
      <div className="almar-section">
        <h3>Tono de piel</h3>
        <div className="almar-color-pills">
          {SKIN_TONES.map(s => (
            <button key={s.id} className={`almar-color-pill ${character.skinTone === s.id ? 'selected' : ''}`} onClick={() => set('skinTone', s.id)}>
              <span className="almar-color-dot" style={{ background: s.color }} />{s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="almar-section">
        <h3>Color de pelo</h3>
        <div className="almar-color-pills">
          {HAIR_COLORS.map(h => (
            <button key={h.id} className={`almar-color-pill ${character.hairColor === h.id ? 'selected' : ''}`} onClick={() => set('hairColor', h.id)}>
              <span className="almar-color-dot" style={{ background: h.color }} />{h.label}
            </button>
          ))}
        </div>
      </div>
      <div className="almar-section">
        <h3>Color de ropa</h3>
        <div className="almar-color-pills">
          {OUTFIT_COLORS.map(o => (
            <button key={o.id} className={`almar-color-pill ${character.outfitColor === o.id ? 'selected' : ''}`} onClick={() => set('outfitColor', o.id)}>
              <span className="almar-color-dot" style={{ background: o.color }} />{o.label}
            </button>
          ))}
        </div>
      </div>
      <div className="almar-section">
        <h3>Color de ojos</h3>
        <div className="almar-color-pills">
          {EYE_COLORS.map(e => (
            <button key={e.id} className={`almar-color-pill ${character.eyeColor === e.id ? 'selected' : ''}`} onClick={() => set('eyeColor', e.id)}>
              <span className="almar-color-dot" style={{ background: e.color }} />{e.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepAccessories({ character, toggleAccessory }) {
  return (
    <div className="almar-step">
      <h2>¿Qué lleva {character.name || 'el protagonista'}? 🎒</h2>
      <p>Puedes elegir varios complementos</p>
      <div className="almar-options-row wrap">
        {ACCESSORIES.map(a => (
          <button key={a.id} className={`almar-card ${character.accessories.includes(a.id) ? 'selected' : ''}`} onClick={() => toggleAccessory(a.id)}>
            <span className="almar-card-icon">{a.icon}</span><span>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepFamily({ character, set, setAdult }) {
  const slots = getAdultSlots(character.family)
  return (
    <div className="almar-step">
      <h2>¿Quién acompaña a {character.name || 'el protagonista'}? 💛</h2>
      <div className="almar-section">
        <h3>Estructura familiar</h3>
        <div className="almar-options-row wrap">
          {FAMILY_OPTIONS.map(f => (
            <button key={f.id} className={`almar-card ${character.family === f.id ? 'selected' : ''}`} onClick={() => set('family', f.id)}>
              <span className="almar-card-icon">{f.icon}</span><span>{f.label}</span>
            </button>
          ))}
        </div>
      </div>
      {slots.length > 0 && (
        <div className="almar-section">
          <h3>Personaliza a los adultos</h3>
          <div className="almar-adults-row">
            {slots.map(slot => (
              <AdultCustomizer key={slot.key} label={slot.label} gender={slot.gender}
                data={character[slot.key]} onChange={(key, value) => setAdult(slot.key, key, value)} />
            ))}
          </div>
        </div>
      )}
      <div className="almar-section">
        <h3>Mascota</h3>
        <div className="almar-options-row wrap">
          {PETS.map(p => (
            <button key={p.id} className={`almar-card ${character.pet === p.id ? 'selected' : ''}`} onClick={() => set('pet', p.id)}>
              <span className="almar-card-icon">{p.icon}</span><span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function AdultCustomizer({ label, gender, data, onChange }) {
  const outfitOptions = gender === 'f' ? ADULT_F_OUTFIT : ADULT_M_OUTFIT
  return (
    <div className="almar-adult-customizer">
      <div className="almar-adult-preview-wrap">
        <AdultPreview gender={gender} data={data} />
        <div className="almar-adult-label">{label}</div>
      </div>
      <div className="almar-adult-options">
        <div className="almar-adult-option-group">
          <span className="almar-adult-option-label">Piel</span>
          <div className="almar-swatches small">
            {ADULT_SKIN_TONES.map(s => (
              <button key={s.id} className={`almar-swatch ${data.skinTone === s.id ? 'selected' : ''}`}
                style={{ background: s.color }} title={s.label} onClick={() => onChange('skinTone', s.id)} />
            ))}
          </div>
        </div>
        {gender === 'f' && (
          <div className="almar-adult-option-group">
            <span className="almar-adult-option-label">Pelo</span>
            <div className="almar-swatches small">
              {ADULT_HAIR_COLORS.map(h => (
                <button key={h.id} className={`almar-swatch ${data.hairColor === h.id ? 'selected' : ''}`}
                  style={{ background: h.color }} title={h.label} onClick={() => onChange('hairColor', h.id)} />
              ))}
            </div>
          </div>
        )}
        <div className="almar-adult-option-group">
          <span className="almar-adult-option-label">Ropa</span>
          <div className="almar-swatches small">
            {outfitOptions.map(o => (
              <button key={o.id} className={`almar-swatch ${data.outfitColor === o.id ? 'selected' : ''}`}
                style={{ background: o.color }} title={o.label} onClick={() => onChange('outfitColor', o.id)} />
            ))}
          </div>
        </div>
        <div className="almar-adult-option-group">
          <span className="almar-adult-option-label">Ojos</span>
          <div className="almar-swatches small">
            {ADULT_EYE_COLORS.map(e => (
              <button key={e.id} className={`almar-swatch ${data.eyeColor === e.id ? 'selected' : ''}`}
                style={{ background: e.color }} title={e.label} onClick={() => onChange('eyeColor', e.id)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AdultPreview({ gender, data }) {
  const layers = gender === 'f'
    ? [`f-piel-${data.skinTone}.png`, `f-outfit-${data.outfitColor}.png`, `f-pelo-${data.hairColor}.png`, 'f-pendientes.png', 'f-flor.png', `f-cejas-${data.hairColor}.png`, `f-ojos-${data.eyeColor}.png`, 'f-contorno.png']
    : [`m-piel-${data.skinTone}.png`, `m-outfit-${data.outfitColor}.png`, 'm-cejas.png', `m-ojos-${data.eyeColor}.png`, 'm-contorno-pelo.png']
  return (
    <div className="almar-adult-wrap">
      {layers.map((file, i) => <img key={i} src={BASE + file} className="almar-adult-layer" alt="" draggable={false} />)}
    </div>
  )
}

function StepPreview({ character, selectedIllustrator, onSend }) {
  const skin   = SKIN_TONES.find(s => s.id === character.skinTone)?.label
  const outfit = OUTFIT_COLORS.find(o => o.id === character.outfitColor)?.label
  const eyes   = EYE_COLORS.find(e => e.id === character.eyeColor)?.label
  const pet    = PETS.find(p => p.id === character.pet)?.label
  const age    = AGES.find(a => a.id === character.age)?.label
  const fam    = FAMILY_OPTIONS.find(f => f.id === character.family)?.label

  return (
    <div className="almar-step">
      <h2>¡{character.name} está listo! 🎉</h2>
      <p>Revisa los detalles y envíanos el pedido por WhatsApp</p>
      {selectedIllustrator && (
        <div className="almar-preview-illus-header" style={{ background: selectedIllustrator.avatar }}>
          <span style={{ fontSize: 28 }}>{selectedIllustrator.icon}</span>
          <div>
            <strong>{selectedIllustrator.name}</strong>
            <span className="almar-preview-illus-style">Estilo {selectedIllustrator.style} · {selectedIllustrator.city}</span>
          </div>
        </div>
      )}
      <div className="almar-summary">
        <SummaryRow label="Nombre"  value={character.name} />
        <SummaryRow label="Género"  value={character.gender} />
        <SummaryRow label="Edad"    value={age} />
        <SummaryRow label="Piel"    value={skin} />
        <SummaryRow label="Ropa"    value={outfit} />
        <SummaryRow label="Ojos"    value={eyes} />
        {character.accessories.length > 0 && <SummaryRow label="Complementos" value={character.accessories.join(', ')} />}
        {character.family !== 'sin_padres' && <SummaryRow label="Familia" value={fam} />}
        {character.pet !== 'ninguno' && <SummaryRow label="Mascota" value={pet} />}
      </div>
      <button className="almar-btn cart" onClick={onSend}>
        💬 Pedir por WhatsApp
      </button>
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="almar-summary-row">
      <span className="almar-summary-label">{label}</span>
      <span className="almar-summary-value">{value}</span>
    </div>
  )
}

function CharacterPreview({ character }) {
  const skinMap = { claro: 'piel-claro.png', medio: 'piel-medio.png', olivaceo: 'piel-medio.png', oscuro: 'piel-medio.png' }
  const eyeMap  = { marron: 'marron', avellana: 'marron', verde: 'verde', azul: 'azul', gris: 'gris', negro: 'negro' }
  const layers  = [
    skinMap[character.skinTone] || 'piel-claro.png',
    `pelo-ropa-${character.outfitColor || 'rosa'}.png`,
    `ojos-${eyeMap[character.eyeColor] || 'marron'}.png`,
    'zapatos-marron.png',
    'contorno.png',
  ]
  return (
    <div className="almar-char-wrap">
      {layers.map((file, i) => <img key={i} src={BASE + file} className="almar-char-layer" alt="" draggable={false} />)}
    </div>
  )
}
