const express = require('express')
const router = express.Router()
const controller = require("../Controllers/products")
const isAuth = require('../midleware/autentication');

router.get('/listar', controller.listProduct)
router.post('/', isAuth ,controller.saveProduct)
router.get('/actualizar/:id', controller.updateById)
router.post('/actualizar', controller.update)
router.post('/borrar/:id', controller.deleteById)

module.exports = router
 


