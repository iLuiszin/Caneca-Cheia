import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

function OrderDetails() {
  const state = useContext(GlobalState)
  const [history] = state.userAPI.history
  const [orderDetails, setOrderDetails] = useState([])

  const params = useParams()

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item)
      })
    }
  }, [params.id, history])

  if (orderDetails.length === 0) return null

  return (
    <div className='history-page'>
      <table>
        <thead>
          <tr>
            <th>Nome do Comprador</th>
            <th>Código do país</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails.name}</td>
            <td>{orderDetails.address.country_code}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin: '30px 0px' }}>
        <thead>
          <tr>
            <th></th>
            <th>Produtos</th>
            <th>Quantidade</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.cart.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.images.url} alt='' />
              </td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>
                r${' '}
                {(item.price * item.quantity)
                  .toFixed(2)
                  .toString()
                  .replace('.', ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderDetails
