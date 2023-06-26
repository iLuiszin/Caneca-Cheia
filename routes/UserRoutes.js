const router = require('express').Router()
const UserController = require('../controllers/UserController')
const auth = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/logout', UserController.logout)
router.get('/refresh_token', UserController.refreshToken)
router.get('/info', auth, UserController.getUser)
router.patch('/add_cart', auth, UserController.addCart)
router.get('/history', auth, UserController.history)

module.exports = router
