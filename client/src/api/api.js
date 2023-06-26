import axios from 'axios'

export default axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
})

axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
})
