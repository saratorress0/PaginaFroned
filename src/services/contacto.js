import axios from 'axios'

const baseUrl = '/api/contactanos'

const enviar = async (nuevoContacto) => {
  const response = await axios.post(baseUrl, nuevoContacto)
  return response.data
}

export default { enviar }
