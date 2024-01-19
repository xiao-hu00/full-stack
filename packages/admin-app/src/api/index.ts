import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 120 * 1000,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  } 
  return config
})

api.interceptors.response.use((response) => {
  return Promise.resolve(response.data)
}, (error) => {
  console.log('request error:', error)
  return Promise.reject(error?.response?.data)
})

export default api
