const express = require('express');
// Para Carrito en  momemoria usar:
//const Carrito = require('../api/carritomemoria')
// Para carrito en persistencia Filesystem usar:
const Carrito = require('../api/carritofs')
const app = express();
const routerCarrito = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//let carrito = new Carrito()



routerCarrito.post('/agregar/:id', (req, res) => {
    let producto_nuevo = Carrito.guardar(req.params.id); {
        res.status(201).json(producto_nuevo)
    }
});


routerCarrito.get("/listar", async(req, res) => {
    const products = Carrito.listar()
    if (!products) {
        return res.status(404).json({
            error: "no hay productos cargados",
        });
    }
    res.json(products);
});


routerCarrito.get('/listar/:id', async(req, res) => {
    const products = await Carrito.listarPorId(req.params.id)
    if (!products) {
        return res.status(404).json({
            error: "No se encontro el producto solicitado",
        });
    }
    res.json(products);
});

routerCarrito.delete('/borrar/:id', (req, res) => {
    const borrar = Carrito.borrarPorId(req.params.id)
    res.status(200).send(borrar);
});

module.exports = routerCarrito;