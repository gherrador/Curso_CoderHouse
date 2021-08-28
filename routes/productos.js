const express = require('express');
// Para producto en memoria usar:
//const productos = require('../api/productofs')
// Para producto en filesystem usar:
const productos = require('../api/productofs')
const app = express();
const routerProductos = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Middleware que sirve como autentificacion para Admin
function Admin(req, res, next) {
    if (req.body.Admin) {
        next()
    } else {
        res.status(404).json({
            error: -1,
            descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`
        });
    }
}
app.use(Admin)

// Guardar un nuevo producto (solo ADMIN)

routerProductos.post('/guardar', Admin, (req, res) => {
    let producto_nuevo = productos.guardar(req.body); {
        res.status(201).json(producto_nuevo)
    }
});

//ver todos los productos

routerProductos.get("/listar", async(req, res) => {
    const products = await productos.listar()
    if (!products) {
        return res.status(404).json({
            error: "no hay productos cargados",
        });
    }
    res.json(products);
});

// Buscar producto por ID

routerProductos.get('/listar/:id', async(req, res) => {
    const products = productos.listarPorId(req.params.id)
    if (!products) {
        return res.status(404).json({
            error: "No se encontro el producto solicitado",
        });
    }
    res.json(products);
});

// Actualizar producto (Solo ADMIN)
routerProductos.put('/actualizar/:id', Admin, (req, res) => {
    const nuevo = productos.actualizarPorId((req.params.id), (req.body))
    res.status(200).json(nuevo);
});

// Borrar producto (Solo ADMIN)
routerProductos.delete('/borrar/:id', Admin, (req, res) => {
    const borrar = productos.borrarPorId(req.params.id)
    res.status(200).send(borrar);
});

module.exports = routerProductos;