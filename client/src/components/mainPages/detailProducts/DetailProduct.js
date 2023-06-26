import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import './DetailProduct.css'

function DetailProduct() {
  const params = useParams()
  const state = useContext(GlobalState)
  const addCart = state.userAPI.addCart
  const [products] = state.productsAPI.products
  const [isOlder] = state.userAPI.isOlder
  const [detailProduct, setDetailProduct] = useState([])

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product)
      })
    }
  }, [products, params.id])

  if (detailProduct.length === 0) return 0
  return (
    <>
      <div className='detail'>
        <img src={detailProduct.images.url} alt={detailProduct.title} />
        <div className='box-detail'>
          <div className='row'>
            <h2>{detailProduct.title}</h2>
            <h6>{detailProduct.product_id}</h6>
          </div>
          <span>
            R$ {detailProduct.price.toFixed(2).toString().replace('.', ',')}
          </span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          {!isOlder && detailProduct.alcoholic ? (
            <Link
              className='cart'
              onClick={() =>
                alert(
                  'Você precisa ser maior de idade para comprar bebidas alcoólicas'
                )
              }
            >
              Comprar
            </Link>
          ) : (
            <Link
              to='/cart'
              className='cart'
              onClick={() => addCart(detailProduct)}
            >
              Comprar
            </Link>
          )}
        </div>
      </div>

      <div>
        <h2>Produtos Relacionados</h2>
        <div className='products'>
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null
          })}
        </div>
      </div>
    </>
  )
}

export default DetailProduct
