const express = require('express');
const routerProductos = express.Router()
const path = require('path')

// Para producto en memoria usar:
//const productos = require(path.join(__dirname, '../controllers/producto'))
//y quitar "new producto"

// Para producto en filesystem usar:
const producto = require(path.join(__dirname, '../controllers/productofs'))
let productos = new producto
const admin = true

// Guardar un nuevo producto (solo ADMIN)
routerProductos.post("/guardar", async(req, res) => {
    const producto = req.body;

    if (admin) {
        if (await productos.guardar(producto)) {
            res.status(201).json(producto);
        } else {
            res.status(400).json("Falta indicar alguna propiedad del producto a cargar o se encuentra mal declarado");
        }
    } else {
        res.status(404).json({
            error: -1,
            descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`
        });
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
    const productoid = await productos.listarPorId(req.params.id)
    if (!productoid) {
        return res.status(404).json({
            error: "No se encontro el producto solicitado",
        });
    }
    res.json(productoid);
});

// Actualizar producto (Solo ADMIN)
routerProductos.put('/actualizar/:id', async(req, res) => {
    const producto = req.body;
    const { id } = req.params;
    if (admin) {
        if (await productos.actualizarPorId(id, producto)) {
            res.status(201).json(producto);
        } else {
            res.status(400).json("Falta indicar alguna propiedad del producto a cargar o se encuentra mal declarado")
        };
    } else {
        res.status(404).json({
            error: -1,
            descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`
        });
    }
});
// Borrar producto (Solo ADMIN)
routerProductos.delete('/borrar/:id', async(req, res) => {
    const { id } = req.params;
    const productoBorrar = await productos.listarPorId(id);
    if (admin) {
        res.json(productoBorrar);
        productos.borrarPorId(id);
    } else {
        res.status(404).json({
            error: -1,
            descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`
        });
    }
});

module.exports = routerProductos;