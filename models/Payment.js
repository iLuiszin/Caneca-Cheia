const mongoose = require('../db/conn')
const { Schema } = mongoose

const Payment = new mongoose.model(
  'Payment',
  new Schema(
    {
      user_id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      paymentID: {
        type: String,
        required: true,
      },
      address: {
        type: Object,
        required: true,
      },
      cart: {
        type: Array,
        default: [],
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )
)

module.exports = Payment
