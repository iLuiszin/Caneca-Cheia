import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

function BtnRender({ product, deleteProduct }) {
  const state = useContext(GlobalState)
  const [isAdmin] = state.userAPI.isAdmin
  const addCart = state.userAPI.addCart

  return (
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
  )
}

export default BtnRender
