const express = require('express');
const Producto = require('../controllers/producto')
const app = express();
const routerProductos = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let productos = new Producto()
const ProductoDB = require('../../DB/ProductoDB')
const productodb = new ProductoDB;



routerProductos.get("/lista", async(req, res) => {
    const productos = await productodb.listar();
    res.status(201).json(productos)
})

routerProductos.post("/", async(req, res) => {
    const data = req.body;
    const productonuevo = await productodb.listar();
    data.id = productonuevo.length + 1;
    productonuevo.push({
        id: data.id,
        title: data.title,
        price: parseInt(data.price),
        thumbnail: data.thumbnail,
    })
    productodb.guardar(productonuevo)
    let producto = productos.guardar(req.body); {
        if (producto.length !== "0") { return res.redirect('http://localhost:8080/nuevo-producto') };
        res.status(200).json(producto);
    }
    res.status(400).send();
});

routerProductos.get('/listar/:id', (req, res) => {
    productodb.listarPorId(req.params.id)
        .then((art) => res.status(200).send(art))
        .catch((e) => res.json(e))
});

routerProductos.put('/actualizar/:id', (req, res) => {
    const itemactualizado = req.body
    productodb.actualizarPorId(req.params.id, itemactualizado)
        .then((res) => res.status(200).send(res))
        .catch((e) => res.json(e))
});

routerProductos.delete('/borrar/:id', (req, res) => {
    productodb.borrarPorId(req.params.id)
        .then((res) => res.status(200).send(res))
        .catch((e) => res.json(e))
});

module.exports = routerProductos
