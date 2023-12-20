const express = require('express')
const {prodcutController, getProductById, getProductsByUser, updateProuct, deleteProduct }= require('../controller/prodcutController')
const {allProductController} = require('../controller/prodcutController')


const productRouter = express.Router()

productRouter.route('/:userId').post(prodcutController).get(getProductsByUser)
// productRouter.route('/').get(allProductController)
productRouter.route('/p/:productid').get(getProductById).put(updateProuct).delete(deleteProduct)

module.exports = productRouter