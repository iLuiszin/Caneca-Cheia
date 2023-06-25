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
      <h2>Login</h2>
      <form onSubmit={loginSubmit}>
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
          placeholder='Digite a sua senha'
          value={user.password}
          onChange={onChangeInput}
        />

        <div className='row'>
          <button type='submit'>Login</button>
          <p>
            Não possui uma conta? <Link to='/register'>Clique Aqui!</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
