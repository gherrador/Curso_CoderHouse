const express = require('express');
const path = require('path')
const app = express();
const routerProductos = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const ProductoDB = require(path.join(__dirname, '../controllers/ProductoDB'))
const productodb = new ProductoDB;
const admin = true


routerProductos.get("/lista", async(req, res) => {
    try {
        if (admin) {
            const productos = await productodb.listar();
            res.render('lista', {
                active: "lista",
                productos: productos
            })
        } else {
            res.redirect('http://localhost:8080/index/error')
        };
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    }
})

routerProductos.post("/", async(req, res) => {
    try {
        if (admin) {
            const data = req.body;
            const productonuevo = await productodb.listar();
            productodb.guardar(data)
            if (productonuevo.length !== "0") { return res.redirect('http://localhost:8080/index') };
        } else {
            res.redirect('http://localhost:8080/index/error')
        }
    } catch (err) {
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

routerProductos.get("/nombre/:nombre", async(req, res) => {
    try {
        const { nombre } = req.query;
        const producto_nombre = await productodb.listarPorNombre(nombre)
        res.render('filtro', {
            active: "filtro",
            productos: producto_nombre
        });
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    };
});

routerProductos.get("/codigo/:codigo", async(req, res) => {
    try {
        const { codigo } = req.query;
        const producto_codigo = await productodb.listarPorCodigo(codigo)
        res.render('filtro', {
            active: "filtro",
            productos: producto_codigo
        });
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    };
});


routerProductos.get("/precio/:precioInferior/:precioSuperior?", async(req, res) => {
    try {
        const { precioInferior } = req.query;
        const { precioSuperior } = req.query;
        const producto_precio = await productodb.listarPorPrecio(precioInferior, precioSuperior)
        res.render('filtro', {
            active: "filtro",
            productos: producto_precio
        });
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    };
});

routerProductos.get("/stock/:stockInferior/:stockSuperior", async(req, res) => {
    try {
        const { stockInferior } = req.query;
        const { stockSuperior } = req.query;
        const producto_stock = await productodb.listarPorStock(stockInferior, stockSuperior)
        res.render('filtro', {
            active: "filtro",
            productos: producto_stock
        });
    } catch {
        return res.redirect('http://localhost:8080/index/error')
    };
});

routerProductos.post('/actualizar', async(req, res) => {
    const data = req.body
    if (admin) {
        if (await productodb.actualizarPorId(data)) {
            res.redirect("http://localhost:8080/productos/lista")
        }
        res.status(400).send();
    } else {
        res.status(404).json({
            error: -1,
            descripcion: "No cuenta con permisos de administrador para ingresar a esta ruta"
        });
    }
});

routerProductos.post("/borrar/:id", async(req, res) => {
    const { id } = req.params;
    if (admin) {
        productodb.borrarPorId(id);
        res.redirect("http://localhost:8080/productos/lista")
    } else {
        res.status(404).json({
            error: -1,
            descripcion: "No cuenta con permisos de administrador para ingresar a esta ruta"
        });
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


module.exports = routerProductos
