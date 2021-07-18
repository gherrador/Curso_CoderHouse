const express = require('express');
const Productos = require('./api/productos')
const app = express();
const routerProductos = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let productos = new Productos()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/' + 'index.html');
})

routerProductos.post('/guardar', (req, res) => {
    const producto = productos.guardar(req.body)
    res.send(producto)
})

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

app.use('/api/productos/', routerProductos)

const puerto = 8080;
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});
server.on('error', error => {
    console.log('error en el servidor:', error);
});