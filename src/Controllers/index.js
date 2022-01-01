const { productService } = require("../Services")
const ProductsController = require("./products")

module.exports = {
    productsController: ProductsController(productService)   
}