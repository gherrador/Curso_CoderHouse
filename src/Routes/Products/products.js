const isAuth = require("../../midleware/autentication")
const router = require('express').Router();
const  { productsController }  = require("../../Controllers/index");

module.exports = routerConfig = () => {
  router
  .get("/listar", productsController.listProducts)
  .get("/listar/:id", productsController.listById)
  .post("/", productsController.saveProducts) 
  .put('/actualizar/:id', productsController.updateById)
  .delete('/borrar/:id', productsController.deleteById)    

  return router;
};

