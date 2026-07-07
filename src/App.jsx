import React, { useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import IllustratorsPage from './pages/IllustratorsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

export default function App() {
  const [page, setPage] = useState('home')
  const [selectedBook, setSelectedBook] = useState(null)

  const navigate = (p) => { setPage(p); window.scrollTo(0, 0) }

  if (page === 'product' && selectedBook) {
    return <ProductPage book={selectedBook} onBack={() => navigate('home')} navigate={navigate} />
  }
  if (page === 'illustrators') return <IllustratorsPage navigate={navigate} />
  if (page === 'about')        return <AboutPage navigate={navigate} />
  if (page === 'contact')      return <ContactPage navigate={navigate} />

  return (
    <HomePage
      navigate={navigate}
      onSelectBook={(book) => { setSelectedBook(book); navigate('product') }}
    />
  )
}
