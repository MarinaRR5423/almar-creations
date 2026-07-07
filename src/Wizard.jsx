import React, { useState, useEffect } from 'react'
import { useLang } from './LangContext.jsx'
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

const SKIN_IDS    = ['claro','medio','olivaceo','oscuro']
const SKIN_COLORS = { claro: '#FDDBB4', medio: '#E8A87C', olivaceo: '#C68642', oscuro: '#8D5524' }
const OUTFIT_IDS  = ['verde','azul','morado','rosa','naranja','amarillo']
const OUTFIT_COLORS = { verde:'#A8C96B', azul:'#7EC8E3', morado:'#9B59B6', rosa:'#F4A7C3', naranja:'#E8894A', amarillo:'#F5D77E' }
const HAIR_IDS    = ['negro','castano','rubio','pelirrojo','gris','rosa']
const HAIR_COLORS = { negro:'#1A1008', castano:'#6B3A2A', rubio:'#D4B483', pelirrojo:'#B05A28', gris:'#9A9A9A', rosa:'#E89BB5' }
const HAIR_PNG    = { negro:'morado', castano:'verde', rubio:'amarillo', pelirrojo:'naranja', gris:'azul', rosa:'rosa' }
const EYE_IDS     = ['marron','avellana','verde','azul','gris','negro']
const EYE_COLORS  = { marron:'#5C3317', avellana:'#8B6320', verde:'#3D6B4A', azul:'#2E6DA4', gris:'#6B7A8D', negro:'#1A1008' }

const ADULT_SKIN_IDS    = ['claro','medio','oscuro']
const ADULT_SKIN_COLORS = { claro:'#FDDBB4', medio:'#E8A87C', oscuro:'#8D5524' }
const ADULT_HAIR_IDS    = ['rubio','naranja','castano','marron']
const ADULT_HAIR_COLORS = { rubio:'#D4B483', naranja:'#C0652B', castano:'#6B3A2A', marron:'#3A1F10' }
const ADULT_F_OUTFIT_IDS = ['naranja','amarillo','azul','verde','rojo','morado','rosa']
const ADULT_M_OUTFIT_IDS = ['amarillo','rojo','verde','morado','malva']
const ADULT_OUTFIT_COLORS = { naranja:'#E8894A', amarillo:'#F5D77E', azul:'#7EC8E3', verde:'#A8C96B', rojo:'#C0392B', morado:'#9B59B6', rosa:'#D4859A', malva:'#D4859A' }
const ADULT_EYE_IDS     = ['marron','verde']
const ADULT_EYE_COLORS  = { marron:'#6B3A2A', verde:'#4CAF50' }

const STEP_IDS = ['ilustrador','nombre','genero','aspecto','complementos','familia','preview']
const STEP_ICONS = { ilustrador:'🎨', nombre:'✏️', genero:'👦', aspecto:'✨', complementos:'🎒', familia:'👨‍👩‍👧', preview:'🎉' }

const GENDER_IDS = ['nino','nina','neutro']
const GENDER_ICONS = { nino:'👦', nina:'👧', neutro:'🧒' }
const AGE_IDS = ['bebe','pequeno','nino','mayor']
const ACC_IDS = ['gafas','gorra','diadema','mochila','lazo']
const ACC_ICONS = { gafas:'👓', gorra:'🧢', diadema:'👑', mochila:'🎒', lazo:'🎀' }
const FAMILY_IDS = ['mama_papa','dos_mamas','dos_papas','solo_mama','solo_papa','sin_padres']
const FAMILY_ICONS = { mama_papa:'👩👨', dos_mamas:'👩👩', dos_papas:'👨👨', solo_mama:'👩', solo_papa:'👨', sin_padres:'✖️' }
const PET_IDS = ['perro','gato','conejo','pajaro','ninguno']
const PET_ICONS = { perro:'🐶', gato:'🐱', conejo:'🐰', pajaro:'🐦', ninguno:'✖️' }

function getAdultSlots(family, tr) {
  switch (family) {
    case 'mama_papa':  return [{ key: 'adult1', label: tr.adultLabels.mama,  gender: 'f' }, { key: 'adult2', label: tr.adultLabels.papa,  gender: 'm' }]
    case 'dos_mamas':  return [{ key: 'adult1', label: tr.adultLabels.mama1, gender: 'f' }, { key: 'adult2', label: tr.adultLabels.mama2, gender: 'f' }]
    case 'dos_papas':  return [{ key: 'adult1', label: tr.adultLabels.papa1, gender: 'm' }, { key: 'adult2', label: tr.adultLabels.papa2, gender: 'm' }]
    case 'solo_mama':  return [{ key: 'adult1', label: tr.adultLabels.mama,  gender: 'f' }]
    case 'solo_papa':  return [{ key: 'adult1', label: tr.adultLabels.papa,  gender: 'm' }]
    default:           return []
  }
}

const defaultCharacter = {
  illustrator:'', name:'', gender:'nina', age:'nino',
  skinTone:'claro', hairColor:'castano', outfitColor:'rosa', eyeColor:'marron',
  accessories:[], family:'mama_papa', pet:'ninguno',
  adult1:{ skinTone:'claro', hairColor:'marron', outfitColor:'naranja', eyeColor:'marron' },
  adult2:{ skinTone:'claro', hairColor:'marron', outfitColor:'amarillo', eyeColor:'marron' },
}

export default function Wizard({ book, onNameChange }) {
  const { tr } = useLang()
  const [step, setStep]           = useState(0)
  const [character, setCharacter] = useState({ ...defaultCharacter, book: book || '' })

  const set = (key, value) => setCharacter(prev => ({ ...prev, [key]: value }))
  const setAdult = (which, key, value) => setCharacter(prev => ({ ...prev, [which]: { ...prev[which], [key]: value } }))
  const toggleAcc = (id) => setCharacter(prev => ({
    ...prev,
    accessories: prev.accessories.includes(id) ? prev.accessories.filter(a => a !== id) : [...prev.accessories, id],
  }))

  useEffect(() => { onNameChange?.(character.name) }, [character.name])

  const canNext = () => {
    if (step === 0) return !!character.illustrator
    if (step === 1) return !!character.name.trim()
    return true
  }

  const handleSendWhatsApp = () => {
    const ill    = ILLUSTRATORS.find(i => i.id === character.illustrator)
    const msg = `${tr.wizard.sendWhatsapp.replace('💬 ','')} 📚\n\n` +
      `📖 ${book}\n🎨 ${ill?.name}\n👶 ${character.name}\n` +
      `👤 ${tr.genders[character.gender]} · ${tr.ages[character.age]}\n` +
      `🎨 ${tr.skinTones[character.skinTone]} · ${tr.hairColors[character.hairColor]} · ${tr.eyeColors[character.eyeColor]}\n` +
      `👗 ${tr.outfitColors[character.outfitColor]}\n` +
      `🎒 ${character.accessories.length ? character.accessories.map(a => tr.accessories[a]).join(', ') : '-'}\n` +
      `👨‍👩‍👧 ${tr.family[character.family]}\n🐾 ${tr.pets[character.pet]}\n`
    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const selectedIllustrator = ILLUSTRATORS.find(i => i.id === character.illustrator)

  return (
    <div className="almar-wizard">
      <div className="almar-progress">
        <div className="almar-progress-bar">
          <div className="almar-progress-fill" style={{ width: `${(step / (STEP_IDS.length - 1)) * 100}%` }} />
        </div>
        <div className="almar-steps-dots">
          {STEP_IDS.map((id, i) => (
            <div key={id} className={`almar-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
              onClick={() => i < step && setStep(i)} title={tr.steps[id]}>
              <div className="almar-dot-circle">{i < step ? '✓' : STEP_ICONS[id]}</div>
              <div className="almar-dot-label">{tr.steps[id]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="almar-body">
        {step >= 1 && (
          <div className="almar-preview-panel">
            <CharacterPreview character={character} />
            <div className="almar-name-tag">{character.name || tr.wizard.namePlaceholderTag}</div>
            {selectedIllustrator && (
              <div className="almar-illus-badge">
                {selectedIllustrator.icon} {selectedIllustrator.name}
                <span className="almar-illus-badge-style">{selectedIllustrator.style}</span>
              </div>
            )}
          </div>
        )}
        <div className="almar-content-panel" style={{ flex: step === 0 ? '1' : undefined }}>
          {step === 0 && <StepIllustrator character={character} set={set} tr={tr} />}
          {step === 1 && <StepName character={character} set={set} tr={tr} />}
          {step === 2 && <StepGenderAge character={character} set={set} tr={tr} />}
          {step === 3 && <StepAppearance character={character} set={set} tr={tr} />}
          {step === 4 && <StepAccessories character={character} toggleAcc={toggleAcc} tr={tr} />}
          {step === 5 && <StepFamily character={character} set={set} setAdult={setAdult} tr={tr} />}
          {step === 6 && <StepPreview character={character} selectedIllustrator={selectedIllustrator} onSend={handleSendWhatsApp} tr={tr} />}
        </div>
      </div>

      <div className="almar-nav">
        {step > 0 && <button className="almar-btn back" onClick={() => setStep(s => s - 1)}>{tr.wizard.back}</button>}
        {step < STEP_IDS.length - 1 && (
          <button className="almar-btn next" onClick={() => setStep(s => s + 1)} disabled={!canNext()}>
            {tr.wizard.next}
          </button>
        )}
      </div>
    </div>
  )
}

function StepIllustrator({ character, set, tr }) {
  const [popup, setPopup] = React.useState(null)
  return (
    <div className="almar-step wide">
      <h2>{tr.wizard.illustratorTitle}</h2>
      <p>{tr.wizard.illustratorDesc}</p>
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
            <h3 className="almar-popup-title">{tr.wizard.knowArtist} <span style={{ color: '#E07B39' }}>{popup.name.split(' ')[0]}</span>?</h3>
            <p className="almar-popup-city">{popup.city}</p>
            <span className="almar-style-pill" style={{ background: popup.pill, fontSize: 12, padding: '4px 12px' }}>{popup.style}</span>
            <p className="almar-popup-desc">{popup.styleDesc}</p>
            <div className="almar-popup-actions">
              <a className="almar-popup-link" href={`/ilustradores#${popup.id}`} target="_blank" rel="noopener noreferrer">{tr.wizard.portfolio}</a>
              <button className="almar-popup-choose" onClick={() => { set('illustrator', popup.id); setPopup(null) }}>
                {tr.wizard.choose} {popup.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StepName({ character, set, tr }) {
  return (
    <div className="almar-step">
      <h2>{tr.wizard.nameTitle}</h2>
      <p>{tr.wizard.nameDesc}</p>
      <input className="almar-name-input" type="text" placeholder={tr.wizard.namePlaceholder}
        value={character.name} onChange={e => set('name', e.target.value)} maxLength={20} autoFocus />
      <div className="almar-hint">{character.name.length}/20</div>
    </div>
  )
}

function StepGenderAge({ character, set, tr }) {
  return (
    <div className="almar-step">
      <h2>{tr.wizard.genderTitle} {character.name || tr.wizard.protagonist}? 👦👧</h2>
      <div className="almar-section">
        <h3>{tr.wizard.gender}</h3>
        <div className="almar-options-row">
          {GENDER_IDS.map(id => (
            <button key={id} className={`almar-card ${character.gender === id ? 'selected' : ''}`} onClick={() => set('gender', id)}>
              <span className="almar-card-icon">{GENDER_ICONS[id]}</span>
              <span>{tr.genders[id]}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="almar-section">
        <h3>{tr.wizard.age}</h3>
        <div className="almar-options-row">
          {AGE_IDS.map(id => (
            <button key={id} className={`almar-card ${character.age === id ? 'selected' : ''}`} onClick={() => set('age', id)}>
              <span className="almar-card-range">{tr.ageRanges[id]}</span>
              <span>{tr.ages[id]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepAppearance({ character, set, tr }) {
  return (
    <div className="almar-step">
      <h2>{tr.wizard.appearanceTitle} {character.name || tr.wizard.protagonist}? ✨</h2>
      <div className="almar-section">
        <h3>{tr.wizard.skinTone}</h3>
        <div className="almar-color-pills">
          {SKIN_IDS.map(id => (
            <button key={id} className={`almar-color-pill ${character.skinTone === id ? 'selected' : ''}`} onClick={() => set('skinTone', id)}>
              <span className="almar-color-dot" style={{ background: SKIN_COLORS[id] }} />{tr.skinTones[id]}
            </button>
          ))}
        </div>
      </div>
      <div className="almar-section">
        <h3>{tr.wizard.hairColor}</h3>
        <div className="almar-color-pills">
          {HAIR_IDS.map(id => (
            <button key={id} className={`almar-color-pill ${character.hairColor === id ? 'selected' : ''}`} onClick={() => set('hairColor', id)}>
              <span className="almar-color-dot" style={{ background: HAIR_COLORS[id] }} />{tr.hairColors[id]}
            </button>
          ))}
        </div>
      </div>
      <div className="almar-section">
        <h3>{tr.wizard.outfitColor}</h3>
        <div className="almar-color-pills">
          {OUTFIT_IDS.map(id => (
            <button key={id} className={`almar-color-pill ${character.outfitColor === id ? 'selected' : ''}`} onClick={() => set('outfitColor', id)}>
              <span className="almar-color-dot" style={{ background: OUTFIT_COLORS[id] }} />{tr.outfitColors[id]}
            </button>
          ))}
        </div>
      </div>
      <div className="almar-section">
        <h3>{tr.wizard.eyeColor}</h3>
        <div className="almar-color-pills">
          {EYE_IDS.map(id => (
            <button key={id} className={`almar-color-pill ${character.eyeColor === id ? 'selected' : ''}`} onClick={() => set('eyeColor', id)}>
              <span className="almar-color-dot" style={{ background: EYE_COLORS[id] }} />{tr.eyeColors[id]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepAccessories({ character, toggleAcc, tr }) {
  return (
    <div className="almar-step">
      <h2>{tr.wizard.accessoriesTitle} {character.name || tr.wizard.protagonist}? 🎒</h2>
      <p>{tr.wizard.accessoriesDesc}</p>
      <div className="almar-options-row wrap">
        {ACC_IDS.map(id => (
          <button key={id} className={`almar-card ${character.accessories.includes(id) ? 'selected' : ''}`} onClick={() => toggleAcc(id)}>
            <span className="almar-card-icon">{ACC_ICONS[id]}</span>
            <span>{tr.accessories[id]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepFamily({ character, set, setAdult, tr }) {
  const slots = getAdultSlots(character.family, tr)
  return (
    <div className="almar-step">
      <h2>{tr.wizard.familyTitle} {character.name || tr.wizard.protagonist}? 💛</h2>
      <div className="almar-section">
        <h3>{tr.wizard.familyStruct}</h3>
        <div className="almar-options-row wrap">
          {FAMILY_IDS.map(id => (
            <button key={id} className={`almar-card ${character.family === id ? 'selected' : ''}`} onClick={() => set('family', id)}>
              <span className="almar-card-icon">{FAMILY_ICONS[id]}</span>
              <span>{tr.family[id]}</span>
            </button>
          ))}
        </div>
      </div>
      {slots.length > 0 && (
        <div className="almar-section">
          <h3>{tr.wizard.customizeAdults}</h3>
          <div className="almar-adults-row">
            {slots.map(slot => (
              <AdultCustomizer key={slot.key} label={slot.label} gender={slot.gender}
                data={character[slot.key]} onChange={(key, val) => setAdult(slot.key, key, val)} tr={tr} />
            ))}
          </div>
        </div>
      )}
      <div className="almar-section">
        <h3>{tr.wizard.pet}</h3>
        <div className="almar-options-row wrap">
          {PET_IDS.map(id => (
            <button key={id} className={`almar-card ${character.pet === id ? 'selected' : ''}`} onClick={() => set('pet', id)}>
              <span className="almar-card-icon">{PET_ICONS[id]}</span>
              <span>{tr.pets[id]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function AdultCustomizer({ label, gender, data, onChange, tr }) {
  const outfitIds = gender === 'f' ? ADULT_F_OUTFIT_IDS : ADULT_M_OUTFIT_IDS
  return (
    <div className="almar-adult-customizer">
      <div className="almar-adult-preview-wrap">
        <AdultPreview gender={gender} data={data} />
        <div className="almar-adult-label">{label}</div>
      </div>
      <div className="almar-adult-options">
        <div className="almar-adult-option-group">
          <span className="almar-adult-option-label">{tr.wizard.skin}</span>
          <div className="almar-swatches small">
            {ADULT_SKIN_IDS.map(id => (
              <button key={id} className={`almar-swatch ${data.skinTone === id ? 'selected' : ''}`}
                style={{ background: ADULT_SKIN_COLORS[id] }} title={tr.skinTones[id]} onClick={() => onChange('skinTone', id)} />
            ))}
          </div>
        </div>
        {gender === 'f' && (
          <div className="almar-adult-option-group">
            <span className="almar-adult-option-label">{tr.wizard.hair}</span>
            <div className="almar-swatches small">
              {ADULT_HAIR_IDS.map(id => (
                <button key={id} className={`almar-swatch ${data.hairColor === id ? 'selected' : ''}`}
                  style={{ background: ADULT_HAIR_COLORS[id] }} title={tr.hairColors[id]} onClick={() => onChange('hairColor', id)} />
              ))}
            </div>
          </div>
        )}
        <div className="almar-adult-option-group">
          <span className="almar-adult-option-label">{tr.wizard.outfit}</span>
          <div className="almar-swatches small">
            {outfitIds.map(id => (
              <button key={id} className={`almar-swatch ${data.outfitColor === id ? 'selected' : ''}`}
                style={{ background: ADULT_OUTFIT_COLORS[id] }} title={tr.outfitColors[id]} onClick={() => onChange('outfitColor', id)} />
            ))}
          </div>
        </div>
        <div className="almar-adult-option-group">
          <span className="almar-adult-option-label">{tr.wizard.eyes}</span>
          <div className="almar-swatches small">
            {ADULT_EYE_IDS.map(id => (
              <button key={id} className={`almar-swatch ${data.eyeColor === id ? 'selected' : ''}`}
                style={{ background: ADULT_EYE_COLORS[id] }} title={tr.eyeColors[id]} onClick={() => onChange('eyeColor', id)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AdultPreview({ gender, data }) {
  const layers = gender === 'f'
    ? [`f-piel-${data.skinTone}.png`,`f-outfit-${data.outfitColor}.png`,`f-pelo-${data.hairColor}.png`,'f-pendientes.png','f-flor.png',`f-cejas-${data.hairColor}.png`,`f-ojos-${data.eyeColor}.png`,'f-contorno.png']
    : [`m-piel-${data.skinTone}.png`,`m-outfit-${data.outfitColor}.png`,'m-cejas.png',`m-ojos-${data.eyeColor}.png`,'m-contorno-pelo.png']
  return (
    <div className="almar-adult-wrap">
      {layers.map((f,i) => <img key={i} src={BASE+f} className="almar-adult-layer" alt="" draggable={false} />)}
    </div>
  )
}

function StepPreview({ character, selectedIllustrator, onSend, tr }) {
  return (
    <div className="almar-step">
      <h2>¡{character.name} {tr.wizard.previewTitle}</h2>
      <p>{tr.wizard.previewDesc}</p>
      {selectedIllustrator && (
        <div className="almar-preview-illus-header" style={{ background: selectedIllustrator.avatar }}>
          <span style={{ fontSize: 28 }}>{selectedIllustrator.icon}</span>
          <div>
            <strong>{selectedIllustrator.name}</strong>
            <span className="almar-preview-illus-style">{selectedIllustrator.style} · {selectedIllustrator.city}</span>
          </div>
        </div>
      )}
      <div className="almar-summary">
        <SummaryRow label={tr.wizard.summaryName}   value={character.name} />
        <SummaryRow label={tr.wizard.summaryGender} value={tr.genders[character.gender]} />
        <SummaryRow label={tr.wizard.summaryAge}    value={tr.ages[character.age]} />
        <SummaryRow label={tr.wizard.summarySkin}   value={tr.skinTones[character.skinTone]} />
        <SummaryRow label={tr.wizard.summaryOutfit} value={tr.outfitColors[character.outfitColor]} />
        <SummaryRow label={tr.wizard.summaryEyes}   value={tr.eyeColors[character.eyeColor]} />
        {character.accessories.length > 0 && <SummaryRow label={tr.wizard.summaryAcc} value={character.accessories.map(a => tr.accessories[a]).join(', ')} />}
        {character.family !== 'sin_padres' && <SummaryRow label={tr.wizard.summaryFamily} value={tr.family[character.family]} />}
        {character.pet !== 'ninguno' && <SummaryRow label={tr.wizard.summaryPet} value={tr.pets[character.pet]} />}
      </div>
      <button className="almar-btn cart" onClick={onSend}>{tr.wizard.sendWhatsapp}</button>
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
  const skinMap = { claro:'piel-claro.png', medio:'piel-medio.png', olivaceo:'piel-medio.png', oscuro:'piel-medio.png' }
  const eyeMap  = { marron:'marron', avellana:'marron', verde:'verde', azul:'azul', gris:'gris', negro:'negro' }
  const layers  = [skinMap[character.skinTone]||'piel-claro.png', `pelo-ropa-${character.outfitColor||'rosa'}.png`, `ojos-${eyeMap[character.eyeColor]||'marron'}.png`, 'zapatos-marron.png', 'contorno.png']
  return (
    <div className="almar-char-wrap">
      {layers.map((f,i) => <img key={i} src={BASE+f} className="almar-char-layer" alt="" draggable={false} />)}
    </div>
  )
}
