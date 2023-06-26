import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../api/api'
import './Login.css'

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const loginSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/user/login', { ...user })
      localStorage.setItem('firstLogin', true)
      window.location.href = '/'
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input
          type='email'
          name='email'
          required
          placeholder='Digite o seu email'
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type='password'
          name='password'
          required
          autoComplete='on'
          placeholder='Digite a sua senha'
          value={user.password}
          onChange={onChangeInput}
        />

        <div className='row'>
          <button type='submit'>Login</button>

          <Link to='/register'>Cadastrar-se</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
