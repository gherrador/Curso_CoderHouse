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
        const productos = await productodb.listar();
        res.render('lista', {
            active: "lista",
            productos: productos
        });
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    }
})

routerProductos.post("/", async(req, res) => {
    try {
        const data = req.body;
        const productonuevo = await productodb.listar();
        productodb.guardar(data)
        if (productonuevo.length !== "0") { return res.redirect('http://localhost:8080/index') };
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    }
});

routerProductos.get("/listar/:id", async(req, res) => {
    try {
        const { id } = req.query;
        const producto_id = await productodb.listarPorId(id)
        res.render('filtro', {
            active: "filtro",
            productos: producto_id
        });
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
});


routerProductos.post('/actualizar', async(req, res) => {
    try {
        const data = req.body
        await productodb.actualizarPorId(data)
        res.redirect("http://localhost:8080/productos/lista")

    } catch {
        return res.redirect('http://localhost:8080/index/error')
    }
});

routerProductos.get('/actualizar/:id', async(req, res) => {
    const { id } = req.params
    const productoactualizar = await productodb.listarPorId(id)
    res.render('actualizar-producto', {
        active: "actualizar-producto",
        productos: productoactualizar
    })
})

routerProductos.post("/borrar/:id", async(req, res) => {
    try {
        const { id } = req.params;
        await productodb.borrarPorId(id);
        res.redirect("http://localhost:8080/productos/lista")
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    }
});


module.exports = routerProductos