import React, { useContext, useState, useEffect } from 'react'
import api from '../../../api/api'
import { GlobalState } from '../../../GlobalState'
import './Cart.css'
import PaypalButton from './PaypalButton'

function Cart() {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [total, setTotal] = useState(0)
  const [token] = state.token

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

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment

    await api.post(
      '/api/payment',
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    )

    setCart([])
    addToCart([])
    alert('Seu pedido foi realizado com sucesso!')
  }

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: 'center', fontSize: '2rem', marginTop: '2rem' }}>
        Carrinho vazio, adicione algum produto para continuar comprando
      </h2>
    )

  return (
    <div>
      {cart.map((product) => (
        <div className='detail cart'>
          <img src={product.images.url} alt={product.title} />
          <div className='box-detail'>
            <h2>{product.title}</h2>
            <h3>
              R${' '}
              {(product.price * product.quantity)
                .toFixed(2)
                .toString()
                .replace('.', ',')}
            </h3>
            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className='amount'>
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}>+</button>
            </div>
            <div className='delete' onClick={() => removeProduct(product._id)}>
              {' '}
              X{' '}
            </div>
          </div>
        </div>
      ))}
      <div className='total'>
        <h4>Total: R$ {total}</h4>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  )
}

export default Cart
