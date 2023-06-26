import React, { useContext, useState, useEffect } from 'react'
import api from '../../../api/api'
import { GlobalState } from '../../../GlobalState'
import './Cart.css'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

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
        headers: { Authorization: token },
      }
    )
  }

  const clearCart = async () => {
    await api.patch(
      '/user/clear_cart',
      { cart },
      {
        headers: { Authorization: token },
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

  const tranSuccess = async (paymentID, address) => {
    await api.post(
      '/api/payment',
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    )

    setCart([])
    addToCart([])
    clearCart()
    alert('Seu pedido foi realizado com sucesso!')
  }

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.replace(',', '.'),
          },
        },
      ],
    })
  }

  const paypalOptions = {
    'client-id':
      'AYEcs4_cavMm30yCbA6BX8k5L8brp06pv-zEh6Fawaant5qr2hkap91WIZjkq_rKwmS-nGrBt-yMWjy1',
    currency: 'BRL', //dynamic amount from state
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
        <div key={product._id} className='detail cart'>
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
        <PayPalScriptProvider options={paypalOptions}>
          <PayPalButtons
            style={{ layout: 'horizontal' }}
            createOrder={createOrder}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                console.log(details)
                tranSuccess(details.id, details.payer.address)
              })
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  )
}

export default Cart
