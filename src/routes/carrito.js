const express = require('express');
const path = require('path');
const productos = require('../controllers/ProductoDB')
const productodb = new productos
const routerCarrito = express.Router()
const CarritoDB = require('../controllers/CarritoDB')
const Carrito = new CarritoDB;

routerCarrito.get("/lista", async(req, res) => {
    try {
        const productos = await Carrito.listar();
        res.render('listacarrito', {
            active: "listacarrito",
            carrito: productos
        });
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    }
})


routerCarrito.get("/", async(req, res) => {
    try {
        const productos = await productodb.listar();
        res.render('carrito', {
            active: "carrito",
            productos: productos
        });
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    }
})

routerCarrito.post('/compras/:id', async(req, res) => {
    try {
        const productos = await productodb.listar();
        const { id } = req.params
        const producto = await productos.find(producto => producto._id == (id));
        await Carrito.guardar(producto)
        return res.redirect('http://localhost:8080/carrito')
    } catch (err) {
        return res.redirect('http://localhost:8080/index/error')
    }
});

routerCarrito.get("/listar/:id", async(req, res) => {
    try {
        const { id } = req.query;
        const producto_id = await productodb.listarPorId(id)
        res.render('filtro-carrito', {
            active: "filtro-carrito",
            productos: producto_id
        });
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
});

routerCarrito.post("/borrar/:id", async(req, res) => {
    try {
        const { id } = req.params;
        await Carrito.borrarPorId(id);
        res.redirect("http://localhost:8080/carrito/lista")
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    };
});


routerCarrito.get("/nombre/:nombre", async(req, res) => {
    try {
        const { nombre } = req.query;
        const producto_nombre = await productodb.listarPorNombre(nombre)
        res.render('filtro-carrito', {
            active: "filtro-carrito",
            productos: producto_nombre
        });
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    };
});

routerCarrito.get("/codigo/:codigo", async(req, res) => {
    try {
        const { codigo } = req.query;
        const producto_codigo = await productodb.listarPorCodigo(codigo)
        res.render('filtro-carrito', {
            active: "filtro-carrito",
            productos: producto_codigo
        });
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    };
});


routerCarrito.get("/precio/:precioInferior/:precioSuperior?", async(req, res) => {
    try {
        const { precioInferior } = req.query;
        const { precioSuperior } = req.query;
        const producto_precio = await productodb.listarPorPrecio(precioInferior, precioSuperior)
        res.render('filtro-carrito', {
            active: "filtro-carrito",
            productos: producto_precio
        });
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    };
});

routerCarrito.get("/stock/:stockInferior/:stockSuperior", async(req, res) => {
    try {
        const { stockInferior } = req.query;
        const { stockSuperior } = req.query;
        const producto_stock = await productodb.listarPorStock(stockInferior, stockSuperior)
        res.render('filtro-carrito', {
            active: "filtro-carrito",
            productos: producto_stock
        });
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    };
});



module.exports = routerCarrito