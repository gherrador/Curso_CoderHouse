const express = require("express");
const app = express();
const path = require('path')
const handlebars = require('express-handlebars');
const productoRoutes = require('./src/routes/productos');
const frontProducto = require('./src/routes/front');
const frontinicio = require('./src/routes/inicio')
const carritoRoutes = require("./src/routes/carrito");
const { getConnection } = require("./src/controllers/app")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//const chat = require('./src/controllers/mensajes');
const mensajesDB = require('./src/controllers/MensajesDB')
const chats = new mensajesDB;
const puerto = 8080;
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});
server.on('error', error => {
    console.log('error en el servidor:', error);
});
//const chats = new chat();
app.engine(
    'hbs', handlebars({
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials/'
    })
)
app.set('view engine', '.hbs');

app.use('/productos', productoRoutes);
app.use('/index', frontProducto);
app.use('/inicio', frontinicio);
app.use('/carrito', carritoRoutes);
app.use(express.static("public"))

getConnection();

const SocketIO = require('socket.io');
const io = SocketIO(server);
//const listaProductos = []
//let mensajes = 0

io.on('connection', async(socket) => {
    socket.emit('mensajes', await chats.leer())
    socket.on('nuevo_mensaje', async(data) => {
        let listamensajes = await chats.leer();
        const nuevomensaje = {
            id: listamensajes.length + 1,
            autor: data.autor,
            texto: data.texto,
            date: new Date().toLocaleDateString()
        };
        listamensajes.push(nuevomensaje)
        await chats.guardar(listamensajes)
        io.sockets.emit('mensajes', listamensajes)
    })
})