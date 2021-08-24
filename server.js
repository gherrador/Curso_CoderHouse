const express = require("express");
const app = express();
const productoRoutes = require('./routes/productos');
const carritoRoutes = require('./routes/carrito')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const puerto = 8080;
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});
server.on('error', error => {
    console.log('error en el servidor:', error);
});

app.use('/api/productos', productoRoutes);
app.use('/api/carrito', carritoRoutes);
app.use("*", (req, res) => {
    res.status(404).send({
        error: -2,
        descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`
    })
})