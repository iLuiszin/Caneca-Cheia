const Category = require('../models/Category')
const Product = require('../models/Product')

const CategoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find()
      res.json(categories)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name } = req.body

      const category = await Category.findOne({ name })

      if (category) {
        return res.status(400).json({ msg: 'Essa categoria já existe!' })
      }

      const newCategory = new Category({ name })

      await newCategory.save()
      return res.json({ msg: 'Categoria criada com sucesso!' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const products = await Product.findOne({ category: req.params.id })
      if (products)
        return res.status(400).json({
          msg: 'Por favor, delete todos os produtos com uma relação a essa categoria.',
        })
      await Category.findByIdAndDelete(req.params.id)
      res.json({ msg: 'Categoria deletada com sucesso!' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name } = req.body
      await Category.findOneAndUpdate({ _id: req.params.id }, { name })
      res.status(200).json({ msg: 'Categoria atualizada com sucesso!' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
}

module.exports = CategoryController
