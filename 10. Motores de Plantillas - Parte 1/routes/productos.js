const express = require('express');
const Producto = require('../api/producto')
const app = express();
const routerProductos = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let productos = new Producto()

routerProductos.get('/lista', (req, res) => {
    const productos_vista = productos.listar()
    res.render('lista', {
        active: 'lista',
        productos: productos_vista
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/' + 'index.html');
})

routerProductos.post("/guardar", (req, res) => {
    const data = req.body;
    if (productos.guardar(data)) {
        if (data.form === "1") { return res.redirect('http://localhost:8080/api/nuevo-producto') };
        res.status(201).json(data);
    }
    res.status(400).send();
});
routerProductos.get('/listar', (req, res) => {
    try {
        const listado = productos.listar()
        res.status(200).send(listado)
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
});

routerProductos.get('/listar/:id', (req, res) => {
    try {
        const articulo = productos.obtenerPorId(req.params.id)
        res.status(200).send(articulo)
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
});

routerProductos.put('/actualizar/:id', (req, res) => {
    try {
        const nuevo = productos.actualizarPorId((req.params.id), (req.body))
        res.status(200).send(nuevo);
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
});

routerProductos.delete('/borrar/:id', (req, res) => {
    try {
        const borrar = productos.borrarPorId(req.params.id)
        res.status(200).send(borrar);
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
});

module.exports = routerProductos;