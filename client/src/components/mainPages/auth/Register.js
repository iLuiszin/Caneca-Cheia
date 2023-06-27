import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../api/api'

function Register() {
  const [user, setUser] = useState({
    name: '',
    birthday: '',
    email: '',
    password: '',
  })

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const registerSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/user/register', { ...user })
      localStorage.setItem('firstLogin', true)
      window.location.href = '/'
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  return (
    <div className='login-page'>
      <form onSubmit={registerSubmit}>
        <h2>Registrar</h2>
        <input
          type='text'
          name='name'
          required
          placeholder='Digite o seu nome'
          value={user.name}
          onChange={onChangeInput}
        />
        <input
          type='text'
          name='birthday'
          required
          placeholder='Digite a sua idade'
          value={user.birthday}
          onChange={onChangeInput}
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => (e.target.type = 'text')}
        />
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
          <button type='submit'>Registrar</button>
          <Link to='/login'>Fazer Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
