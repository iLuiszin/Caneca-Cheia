import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/product_item/ProductItem'
import LoadMore from '../utils/product_item/Filters/LoadMore'
import './Products.css'
import Loading from '../utils/Loading/Loading'
import api from '../../../api/api'
import Filters from '../utils/product_item/Filters/Filters'

function Products() {
  const state = useContext(GlobalState)
  const [products, setProducts] = state.productsAPI.products
  const [isAdmin] = state.userAPI.isAdmin
  const [callback, setCallback] = state.productsAPI.callback
  const [isChecked, setChecked] = useState(false)
  const [setLoading] = useState(false)
  const [token] = state.token

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
      setLoading(false)
      setCallback(!callback)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isChecked
    })
    setProducts([...products])
    setChecked(!isChecked)
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

  return (
    <>
      <Filters />
      {isAdmin && (
        <div
          className='delete-all'
          style={{ textAlign: 'right', margin: '20px' }}
        >
          <span
            style={{
              textTransform: 'uppercase',
              color: 'blue',
              letterSpacing: '1.3px',
            }}
          >
            Selecione todos
          </span>
          <input
            style={{
              height: '25px',
              width: '25px',
              transform: 'translate(5px, 13px)',
              margin: '0 15px',
            }}
            type='checkbox'
            checked={isChecked}
            onChange={checkAll}
          />
          <button
            onClick={deleteAll}
            style={{
              border: '1px solid crimson',
              padding: '0px 25px',
              color: 'crimson',
              textTransform: 'uppercase',
            }}
          >
            Deletar todos
          </button>
        </div>
      )}
      <div className='products'>
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              callback={callback}
              setCallback={setCallback}
              setProducts={setProducts}
              products={products}
              deleteProduct={deleteProduct}
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
