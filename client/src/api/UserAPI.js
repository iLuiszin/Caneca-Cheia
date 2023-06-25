import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isOlder, setIsOlder] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/user/info', {
            headers: { Authorization: token },
          })
          setIsLogged(true)
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
          res.data.isOlder === 1 ? setIsOlder(true) : setIsOlder(false)
          setCart(res.data.cart)
        } catch (error) {
          alert(error.response.data.msg)
        }
      }
      getUser()
    }
  }, [token])

  const addCart = async (product) => {
    if (!isLogged) return alert('Por favor, faça login para continuar')
    if (!isOlder && product.alcoholic) {
      return alert(
        'Você precisa ser maior de idade para comprar bebidas alcoólicas'
      )
    }

    const check = cart.every((item) => {
      return item._id !== product._id
    })

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }])
      await axios.patch(
        '/user/add_cart',
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      )
    } else {
      alert('Este produto já foi adicionado ao carrinho')
    }
  }

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    isOlder: [isOlder, setIsOlder],
    addCart: addCart,
    cart: [cart, setCart],
  }
}

export default UserAPI
