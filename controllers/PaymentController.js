const Payment = require('../models/Payment')
const User = require('../models/User')
const Product = require('../models/Product')

const PaymentController = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payment.find()
      res.json(payments)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('name email')
      if (!user) return res.status(400).json({ msg: 'User does not exist.' })

      const { cart, paymentID, address } = req.body

      const { _id, name, email } = user

      const newPayment = new Payment({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        address,
      })

      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold)
      })

      await newPayment.save()
      res.json({ msg: 'Pagamento bem sucedido!' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

const sold = async (id, quantity, oldSold) => {
  await Product.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  )
}

module.exports = PaymentController
