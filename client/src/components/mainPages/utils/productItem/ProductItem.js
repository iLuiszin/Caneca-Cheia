import React, { useState } from 'react'
import './ProductItem.css'
import Loading from '../Loading/Loading'
import BtnRender from './BtnRender'

function ProductItem({
  product,
  isAdmin,
  deleteProduct,
  products,
  setProducts,
}) {
  const [loading] = useState(false)

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked
    })
    setProducts([...products])
  }

  if (loading)
    return (
      <div className='product_card'>
        <Loading />
      </div>
    )
  return (
    <div className='product_card'>
      {isAdmin && (
        <input
          type='checkbox'
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <img src={product.images.url} alt='' />

      <div className='product_box'>
        <h2 title={product.title}>{product.title}</h2>

        <span>R$ {product.price.toFixed(2).toString().replace('.', ',')}</span>

        <p>{product.description}</p>
      </div>

      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  )
}

export default ProductItem
