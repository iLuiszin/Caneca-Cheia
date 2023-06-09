import { useState, useEffect } from 'react'
import api from './api'

function CategoriesAPI(token) {
  const [categories, setCategories] = useState([])
  const [callback, setCallback] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      const res = await api.get('/api/category')
      setCategories(res.data)
    }
    getCategories()
  }, [callback])
  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  }
}

export default CategoriesAPI
