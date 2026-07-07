import React, { useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'

export default function App() {
  const [page, setPage] = useState('home')
  const [selectedBook, setSelectedBook] = useState(null)

  if (page === 'product' && selectedBook) {
    return <ProductPage book={selectedBook} onBack={() => setPage('home')} />
  }

  return (
    <HomePage
      onSelectBook={(book) => {
        setSelectedBook(book)
        setPage('product')
      }}
    />
  )
}
