import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductItem.css'
import { GlobalState } from '../../../../GlobalState'
import Loading from '../Loading/Loading'

function ProductItem({
  product,
  isAdmin,
  deleteProduct,
  products,
  setProducts,
}) {
  const state = useContext(GlobalState)
  const addCart = state.userAPI.addCart
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
        <h2>{product.title}</h2>

        <h1>R$ {product.price.toFixed(2).toString().replace('.', ',')}</h1>

        <p>{product.description}</p>
      </div>
      <div className='row_btn'>
        {isAdmin ? (
          <>
            <Link
              id='btn_buy'
              to='#!'
              onClick={() => {
                if (
                  window.confirm(
                    'Você tem certeza que deseja deletar esse produto?'
                  )
                ) {
                  deleteProduct(product._id, product.images.public_id)
                  alert('Produto deletado com sucesso!')
                }
              }}
            >
              deletar
            </Link>
            <Link id='btn_view' to={`/edit_product/${product._id}`}>
              editar
            </Link>
          </>
        ) : (
          <>
            <Link id='btn_buy' to='#!' onClick={() => addCart(product)}>
              Comprar
            </Link>
            <Link id='btn_view' to={`/detail/${product._id}`}>
              Ver
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductItem
