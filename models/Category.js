const mongoose = require('../db/conn')
const { Schema } = mongoose

const Category = new mongoose.model(
  'Category',
  new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
    },
    { timestamps: true }
  )
)

module.exports = Category
