import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../api/api'
import { GlobalState } from '../../../GlobalState'
import './Cart.css'

function Cart() {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getTotal = () => {
      let total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity
      }, 0)

      total = total.toFixed(2).toString().replace('.', ',')
      setTotal(total)
    }
    getTotal()
  }, [cart])

  const addToCart = async () => {
    await api.patch(
      '/user/add_cart',
      { cart },
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    )
  }

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1
      }
    })
    setCart([...cart])
    addToCart()
  }

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1)
      }
    })
    setCart([...cart])

    addToCart()
  }

  const removeProduct = (id) => {
    if (window.confirm('Deseja remover este produto do carrinho?')) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1)
        }
      })
      setCart([...cart])
    }
  }

  if (cart.length === 0)
    return <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>Cart Empty</h2>

  return (
    <div>
      {cart.map((product) => (
        <div className='detail cart'>
          <img
            src={product.images.url}
            alt={product.title}
            className='img-container'
          />
          <div className='box-detail'>
            <h2>{product.title}</h2>
            <h5>
              R${' '}
              {(product.price * product.quantity)
                .toFixed(2)
                .toString()
                .replace('.', ',')}
            </h5>
            <p>
              <h4 style={{ textDecoration: 'underline', color: 'whitesmoke' }}>
                Conteúdo:
              </h4>
              {product.content}
            </p>
            <p>
              <h4 style={{ textDecoration: 'underline', color: 'whitesmoke' }}>
                Descrição:
              </h4>
              {product.description}
            </p>
            <div className='amount'>
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}>+</button>
            </div>
            <div className='delete' onClick={() => removeProduct(product._id)}>
              {' '}
              x{' '}
            </div>
          </div>
        </div>
      ))}
      <div className='total'>
        <h4>Total: R$ {total}</h4>
        <Link to='#'>Pagamento</Link>
      </div>
    </div>
  )
}

export default Cart
