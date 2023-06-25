const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = new mongoose.model(
  'User',
  new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: Number,
        default: 0,
      },
      birthday: {
        type: Date,
        required: true,
      },
      isOlder: {
        type: Number,
        default: 0,
      },
      cart: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true }
  )
)

module.exports = User
