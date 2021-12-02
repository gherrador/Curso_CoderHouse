const express = require('express');
const path = require('path')
const app = express();
const routerProductos = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const ProductoDB = require('../controllers/ProductoDB')
const productodb = new ProductoDB;


routerProductos.get("/lista", async(req, res) => {
    try {
        let productos = await productodb.listar();
        return res.json(productos)
    } catch {
        return res.redirect('https://codder-app.herokuapp.com/')
    }
})

routerProductos.post("/", async(req, res) => {
    try {
        const data = req.body;
        productodb.guardar(data)
        const productonuevo = await productodb.listar();
        if (productonuevo.length !== "0") { return res.json(productonuevo) };
    } catch {
        return res.status(404).send('imposible guardar producto')
    }
});

routerProductos.get("/listar/:id", async(req, res) => {
    try {
        const { id } = req.params;        
        const producto_id = await productodb.listarPorId(id)
        return res.json(producto_id)
    } catch (err) {
        res.status(404).json('No se encontro el producto buscado')
    }
});


routerProductos.put("/actualizar/:id", async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    if (await productodb.actualizar(id, data)) {
        res.status(201).json(data);
    }
    res.status(400).send();
});


routerProductos.delete("/borrar/:id", async(req, res) => {
    try {
        const { id } = req.params;        
        await productodb.borrarPorId(id);
        res.status(200).send("Producto borrado")
    } catch {
        return res.status(404).send('Imposible borrar producto')
    }
});


module.exports = routerProductos