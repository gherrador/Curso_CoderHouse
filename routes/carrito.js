const express = require('express');
const Carrito = require('../api/carritofs')
const app = express();
const routerCarrito = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let carrito = new Carrito()



routerCarrito.post('/agregar/:id', (req, res) => {
    let producto_nuevo = carrito.guardar(req.params.id); {
        res.status(201).json(producto_nuevo)
    }
});


routerCarrito.get("/listar", async(req, res) => {
    const products = await carrito.listar()
    if (!products) {
        return res.status(404).json({
            error: "no hay productos cargados",
        });
    }
    res.json(products);
});


routerCarrito.get('/listar/:id', async(req, res) => {
    const products = await carrito.listarPorId(req.params.id)
    if (!products) {
        return res.status(404).json({
            error: "No se encontro el producto solicitado",
        });
    }
    res.json(products);
});

routerCarrito.delete('/borrar/:id', (req, res) => {
    const borrar = carrito.borrarPorId(req.params.id)
    res.status(200).send(borrar);
});

module.exports = routerCarrito;