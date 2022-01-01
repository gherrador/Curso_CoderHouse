const isAuth = require("../../midleware/autentication")
const router = require('express').Router();
const  { productsController }  = require("../../Controllers/index");

module.exports = routerConfig = () => {
  router
  .get("/listar", productsController.listProducts)
  .get("/listar/:id", productsController.listById)
  .post("/", isAuth ,productsController.saveProducts)
  .get('/actualizar/:id', isAuth,productsController.updateById)
  .post('/actualizar', isAuth,productsController.updateProducts)
  .post('/borrar/:id', isAuth,productsController.deleteById)    

  return router;
};

