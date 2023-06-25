const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router
  .route('/products')
  .get(ProductController.getProducts)
  .post(ProductController.createProducts)

router
  .route('/products/:id')
  .delete(ProductController.deleteProduct)
  .put(ProductController.updateProduct)

module.exports = router
