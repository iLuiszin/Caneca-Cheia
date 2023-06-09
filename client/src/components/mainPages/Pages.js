import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

/* Pages components */
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import DetailProduct from './detailProducts/DetailProduct'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'

import { GlobalState } from '../../GlobalState'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'

function Pages() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  return (
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='/detail/:id' element={<DetailProduct />} />
      <Route path='/login' element={isLogged ? <Products /> : <Login />} />
      <Route
        path='/register'
        element={isLogged ? <Products /> : <Register />}
      />
      <Route
        path='/category'
        element={isLogged ? <Categories /> : <NotFound />}
      />
      <Route
        path='/create_product'
        element={isLogged ? <CreateProduct /> : <NotFound />}
      />
      <Route
        path='/edit_product/:id'
        element={isLogged ? <CreateProduct /> : <NotFound />}
      />
      <Route
        path='/history/:id'
        element={isLogged ? <OrderDetails /> : <NotFound />}
      />
      <Route
        path='/history'
        element={isLogged ? <OrderHistory /> : <NotFound />}
      />

      <Route path='/cart' element={<Cart />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Pages
