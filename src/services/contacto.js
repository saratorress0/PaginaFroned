// src/services/contacto.js
import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/contactanos'

const enviar = async (nuevoContacto) => {
  const response = await axios.post(baseUrl, nuevoContacto)
  return response.data
}

export default { enviar }
