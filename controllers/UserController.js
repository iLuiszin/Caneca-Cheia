const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/* helpers */
const checkAge = require('../middlewares/checkAge')

const UserController = {
  register: async (req, res) => {
    try {
      const { name, birthday, email, password } = req.body

      const user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ msg: 'O email já está em uso!' })
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: 'A senha deve ter no mínimo 6 caracteres!' })
      }

      const age = checkAge(birthday)
      let isOlder = 0

      if (age) {
        isOlder = 1
      } else {
        isOlder = 0
      }

      const passwordHash = await bcrypt.hash(password, 10)
      const newUser = new User({
        name,
        email,
        birthday,
        isOlder,
        password: passwordHash,
      })

      await newUser.save()

      const accesstoken = createAccessToken({ id: newUser._id })
      const refreshToken = createRefreshToken({ id: newUser._id })
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
      })

      return res.json({ accesstoken })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ msg: 'Usuário não encontrado!' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ msg: 'Senha incorreta!' })
      }

      const accesstoken = createAccessToken({ id: user._id })
      const refreshToken = createRefreshToken({ id: user._id })
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
      })

      return res.json({ accesstoken })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('refreshToken', { path: '/user/refresh_token' })
      return res.json({ msg: 'Deslogado!' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken
      if (!rf_token) {
        return res
          .status(400)
          .json({ msg: 'Por favor, faça o login ou registre-se!' })
      }
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: 'Por favor, faça o login ou registre-se!' })
        }
        const accesstoken = createAccessToken({ id: user.id })
        return res.json({ accesstoken })
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')

      if (!user) return res.status(400).json({ msg: 'Usuário não encontrado!' })

      return res.json(user)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  addCart: async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
      if (!user) return res.status(400).json({ msg: 'Usuário não encontrado!' })

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      )
      return res.status(200).json({ msg: 'Adicionado ao carrinho!' })
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  },
}

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = UserController
