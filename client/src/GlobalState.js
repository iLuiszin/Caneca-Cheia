import React, { createContext, useEffect, useState } from 'react'
import ProductsAPI from './api/ProductsAPI'
import CategoriesAPI from './api/CategoriesAPI'
import UserAPI from './api/UserAPI'
import api from './api/api'
export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false)
  const refreshToken = async () => {
    const res = await api.get('/user/refresh_token')
    setToken(res.data.accesstoken)
  }

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) refreshToken()
  }, [])

  ProductsAPI()

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(token),
  }
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
}
