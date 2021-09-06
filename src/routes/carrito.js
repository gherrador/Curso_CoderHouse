const express = require('express');
// Para Carrito en  momemoria usar:
//const Carrito = require('../controllers/carritomemoria')
//y quitar el "New CarritoFS"

//---------------------------------------------------

// Para carrito en persistencia Filesystem usar:
const CarritoFS = require('../controllers/carritofs')
let Carrito = new CarritoFS

const routerCarrito = express.Router()


routerCarrito.post('/agregar/:id', async(req, res) => {
    let producto_nuevo = await Carrito.guardar(req.params.id); {
        res.status(201).json(producto_nuevo)
    }
});

routerCarrito.get("/listar", async(req, res) => {
    const products = await Carrito.listar()
    if (!products) {
        return res.status(404).json({
            error: "no hay productos cargados",
        });
    }
    res.json(products)
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