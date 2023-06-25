import React from 'react'
import { GlobalState } from '../../GlobalState'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import Menu from './icons/bar.svg'
import Cart from './icons/cart.svg'
import Close from './icons/close.svg'
import './Header.css'

function Header() {
  const state = useContext(GlobalState)
  const [isLogged, setIsLogged] = state.userAPI.isLogged
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
  const [cart] = state.userAPI.cart

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to='/create_product'>Criar Produto</Link>
        </li>
        <li>
          <Link to='/category'>Categorias</Link>
        </li>
      </>
    )
  }

  const loggedOut = async () => {
    await api.get('/user/logout')
    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)
  }

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to='/' onClick={loggedOut}>
            Sair
          </Link>
        </li>
      </>
    )
  }

  const [menu, setMenu] = useState(false)

  const styleMenu = {
    left: menu ? 0 : '-100%',
  }

  return (
    <header>
      <div className='menu' onClick={() => setMenu(!menu)}>
        <img src={Menu} alt='' width='30' />
      </div>
      <div className='logo'>
        <h1>
          <Link to='/'>{isAdmin ? 'Admin' : 'Caneca Cheia'}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to='/'>{isAdmin ? 'Produtos' : 'Compras'}</Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to='/login'>Login & Registro</Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt='' width='30' className='menu' />
        </li>
      </ul>

      {isAdmin ? (
        ''
      ) : (
        <div className='cart-icon'>
          <span>{cart.length}</span>
          <Link to='/cart'>
            <img src={Cart} alt='' width='40' />
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
