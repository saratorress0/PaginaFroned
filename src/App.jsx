import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Contact from './components/contact'
import About from './components/about'
import Barra from './components/barra'
import Home from './components/home'
import PiePagina from './components/pie_pagina'

function App() {
  return (
    <Router>
      <div>
        <Barra />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/nosotros" element={<About />} />
        </Routes>
        <PiePagina />
      </div>
    </Router>
  )
}

export default App

