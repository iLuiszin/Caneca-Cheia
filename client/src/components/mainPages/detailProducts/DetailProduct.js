import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/product_item/ProductItem'
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
          <h5>
            R$ {detailProduct.price.toFixed(2).toString().replace('.', ',')}
          </h5>
          <p>
            <h4 style={{ textDecoration: 'underline', color: 'whitesmoke' }}>
              Conteúdo:
            </h4>
            {detailProduct.content}
          </p>
          <p>
            <h4 style={{ textDecoration: 'underline', color: 'whitesmoke' }}>
              Descrição:
            </h4>
            {detailProduct.description}
          </p>
          <p>
            <h4>Vendidos:</h4> {detailProduct.sold}{' '}
          </p>
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
