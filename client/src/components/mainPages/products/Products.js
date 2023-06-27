import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import LoadMore from './LoadMore'
import './Products.css'
import Loading from '../utils/Loading/Loading'
import api from '../../../api/api'
import Filters from './Filters'

function Products() {
  const state = useContext(GlobalState)
  const [products, setProducts] = state.productsAPI.products
  const [isAdmin] = state.userAPI.isAdmin
  const [callback, setCallback] = state.productsAPI.callback
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token] = state.token

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked
    })
    setProducts([...products])
  }

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true)
      const destroyImg = api.post(
        '/api/destroy',
        { public_id },
        {
          headers: { Authorization: token },
        }
      )
      const deleteProduct = api.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      })

      await destroyImg
      await deleteProduct
      setCallback(!callback)
      setLoading(false)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isChecked
    })
    setProducts([...products])
    setIsChecked(!isChecked)
  }

  const deleteAll = async () => {
    if (products.some((product) => product.checked)) {
      const checked = window.confirm(
        'Tem certeza de que deseja excluir todos os produtos selecionados?'
      )
      if (checked) {
        products.forEach((product) => {
          if (product.checked)
            deleteProduct(product._id, product.images.public_id)
        })
        alert('Todos os produtos selecionados foram excluídos com sucesso!')
      }
    }
  }

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    )
  return (
    <>
      <Filters />
      {isAdmin && (
        <div className='delete-all'>
          <span>Selecione todos</span>
          <input type='checkbox' checked={isChecked} onChange={checkAll} />
          <button onClick={deleteAll}>Deletar todos</button>
        </div>
      )}
      <div className='products'>
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          )
        })}
      </div>
      <LoadMore />
      {products.length === 0 && <Loading />}
    </>
  )
}

export default Products
