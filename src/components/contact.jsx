// src/components/Contact.jsx
import React, { useState } from 'react'
import contactoService from '../services/contacto'

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.message) {
      alert('Por favor, completa todos los campos obligatorios.')
      return
    }

    const nuevoContacto = {
      name: form.name,
      number: form.email,  // si no usas "number", elimínalo del backend también
      email: form.email,
      subject: form.subject,
      message: form.message
    }

    try {
      const response = await contactoService.enviar(nuevoContacto)
      console.log('Guardado en MongoDB:', response)
      alert('Formulario enviado con éxito')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error al enviar:', error)
      alert('Error al enviar el formulario')
    }
  }

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '500px'
      }}>
        <h2>Contáctanos</h2>

        <div style={{ marginBottom: '15px' }}>
          <label>Nombre:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Correo Electrónico:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Asunto:</label>
          <input type="text" name="subject" value={form.subject} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Mensaje:</label>
          <textarea name="message" value={form.message} onChange={handleChange} required />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default Contact
