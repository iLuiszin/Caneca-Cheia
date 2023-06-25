const Product = require('../models/Product')

// sort, filtering, pagination

class APIfeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }
  filtering() {
    const queryObj = { ...this.queryString }

    const excludedFields = ['page', 'sort', 'limit']
    excludedFields.forEach((el) => delete queryObj[el])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => '$' + match
    )

    this.query.find(JSON.parse(queryStr))
    return this
  }
  sorting() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.split(',').join(' ')

      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('createdAt') // Sort by price in ascending order
    }
    return this
  }
  paginating() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 9
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

const ProductController = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Product.find(), req.query)
        .filtering()
        .sorting()
      const products = await features.query
      return res.json({
        status: 'success',
        result: products.length,
        products,
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  createProducts: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        alcoholic,
        images,
        category,
      } = req.body

      if (!images)
        return res.status(400).json({ msg: 'Nenhuma imagem foi enviada!' })

      const product = await Product.findOne({ product_id })

      if (product)
        return res.status(400).json({ msg: 'Esse produto já existe!' })

      const newProduct = new Product({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        alcoholic,
        images,
        category,
      })

      await newProduct.save()

      return res.status(201).json({ msg: 'Produto criado!' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  deleteProduct: async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ msg: 'Produto deletado!' })
  },

  updateProduct: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body
      if (!images)
        return res.status(400).json({ msg: 'Nenhuma imagem foi enviada!' })

      await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      )

      return res.status(200).json({ msg: 'Produto atualizado!' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
}

module.exports = ProductController
