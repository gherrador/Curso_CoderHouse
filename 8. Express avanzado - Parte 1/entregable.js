const express = require('express');
const Productos = require('./api/productos')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let productos = new Productos()

app.post('/api/productos/guardar/', (req, res) => {
    const producto = productos.guardar(req.body)
    res.send(producto)
})

app.get('/api/productos/listar', (req, res) => {
    try {
        const listado = productos.listar()
        res.status(200).send(listado)
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
});

app.get('/api/productos/listar/:id', (req, res) => {
    try {
        const articulo = productos.obtenerPorId(req.params.id)
        res.status(200).send(articulo)
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
});

const puerto = 8080;
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});
server.on('error', error => {
    console.log('error en el servidor:', error);
});