const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const productoRoutes = require('./routes/productos');
const frontRoutes = require('./routes/front');
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine(
    'hbs', handlebars({
        extname: 'hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials/'
    })
)
app.use('/api/productos', productoRoutes);
app.use('/api/nuevo-producto', frontRoutes);
const puerto = 8080;
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});
server.on('error', error => {
    console.log('error en el servidor:', error);
});