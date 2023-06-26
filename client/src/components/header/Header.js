import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icons/menu.svg'
import Close from './icons/close.svg'
import Cart from './icons/cart.svg'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import Caneca from '../header/assets/caneca.png'

function Header() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin
  const [cart] = state.userAPI.cart
  const [menu, setMenu] = useState(false)

  const logoutUser = async () => {
    await api.get('/user/logout')

    localStorage.removeItem('firstLogin')

    window.location.href = '/'
  }

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to='/create_product'>Ciar Produto</Link>
        </li>
        <li>
          <Link to='/category'>Categorias</Link>
        </li>
      </>
    )
  }

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to='/history'>Histórico de Compras</Link>
        </li>
        <li>
          <Link to='/' onClick={logoutUser}>
            Sair
          </Link>
        </li>
      </>
    )
  }

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
          <Link to='/'>
            {isAdmin ? (
              'Admin'
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={Caneca} alt='' width='100' />
                  Caneca Cheia
                </div>
              </>
            )}
          </Link>
        </h1>
      </div>

      <ul style={styleMenu} onClick={() => setMenu(!menu)}>
        <li>
          <Link to='/'>Produtos</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to='/login'>Login ✥ Registro</Link>
          </li>
        )}

        <li>
          <img src={Close} alt='' width='30' className='menu' />
        </li>
      </ul>

      {isAdmin ? (
        ''
      ) : (
        <div className='cart-icon'>
          <span>{cart.length}</span>
          <Link to='/cart'>
            <img src={Cart} alt='' width='30' />
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
