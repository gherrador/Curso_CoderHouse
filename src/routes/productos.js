const express = require('express');
const Producto = require('../controllers/producto')
const app = express();
const routerProductos = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let productos = new Producto()
const ProductoDB = require('../../DB/ProductoDB')
const { mysql } = require('../../DB/config');
const productodb = new ProductoDB(mysql);


routerProductos.get('/lista', (req, res) => {
    const productos_vista = productos.listar()
    console.table(productos_vista)
    productodb.listar()
        .then((listado) => res.render('lista', {
            active: 'lista',
            productos: listado
        }))
})

routerProductos.post("/", (req, res) => {
    productodb.guardar(req.body).then(() => console.log('producto cargado'))
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

module.exports = routerProductos;