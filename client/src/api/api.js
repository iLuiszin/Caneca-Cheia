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
