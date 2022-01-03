const { productService } = require("../Services")
const ProductsController = require("./products")
const { chatRepository }  = require("../dal/repository")
const MessageController = require("../Controllers/chat")


module.exports = {
    productsController: ProductsController(productService),
    messageContoller: MessageController(chatRepository)
}