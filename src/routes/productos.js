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
        res.render('lista', {
            active: "lista",
            productos: productos,
            user: req.user
        });
    } catch {
        return res.redirect('https://codder-app.herokuapp.com/')
    }
})

routerProductos.post("/", async(req, res) => {
    try {
        const data = req.body;
        const productonuevo = await productodb.listar();
        productodb.guardar(data)
        if (productonuevo.length !== "0") { return res.redirect('https://codder-app.herokuapp.com/') };
    } catch {
        return res.redirect('https://codder-app.herokuapp.com/')
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
        res.redirect("https://codder-app.herokuapp.com/productos/lista")

    } catch {
        return res.redirect('https://codder-app.herokuapp.com/')
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
        res.redirect("https://codder-app.herokuapp.com/productos/lista")
    } catch {
        return res.redirect('https://codder-app.herokuapp.com/')
    }
});


module.exports = routerProductos