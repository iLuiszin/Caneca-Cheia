const mongoose = require('../db/conn')
const { Schema } = mongoose

const Product = new mongoose.model(
  'Product',
  new Schema(
    {
      product_id: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      title: {
        type: String,
        trim: true,
        required: true,
      },
      price: {
        type: Number,
        trim: true,
        required: true,
      },
      description: {
        type: String,
        trim: true,
        required: true,
      },
      content: {
        type: String,
        trim: true,
        required: true,
      },
      images: {
        type: Object,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      checked: {
        type: Boolean,
        default: false,
      },
      sold: {
        type: Number,
        default: 0,
      },
      alcoholic: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
)

module.exports = Product
