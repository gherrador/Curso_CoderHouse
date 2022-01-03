const Dao  = require("../dal/Dao")
const ProductService = require("./products")

module.exports = {
    productService: ProductService(Dao),
    
}