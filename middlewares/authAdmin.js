const User = require('../models/User')

const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user.id,
    })
    if (user.role === 0) {
      return res.status(400).json({ msg: 'Permissão de administrador negada!' })
    }
    next()
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

module.exports = authAdmin
