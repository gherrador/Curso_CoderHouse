const express = require("express");
const ejs = require('ejs');
const puerto = 8080;
const productRoutes = require("./routes/productos");
const frontRoutes = require('./routes/front');
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/productos", productRoutes);

app.use("/api/nuevo-producto", frontRoutes);

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});
server.on('error', error => {
    console.log('error en el servidor:', error);
});