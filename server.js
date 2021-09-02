const express = require("express");
const app = express();
const path = require('path')
const handlebars = require('express-handlebars');
const productoRoutes = require('./src/routes/productos');
const frontRoutes = require('./src/routes/front');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//const chat = require('./src/controllers/mensajes');
const mensajesDB = require('./DB/MensajesDB')
const { sqlite3 } = require('./DB/config');
const chats = new mensajesDB(sqlite3);
const ProductoDB = require('./DB/ProductoDB')
const { mysql } = require('./DB/config');
const productodb = new ProductoDB(mysql);
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
productodb.crearTablaProductos()
chats.crearTablaMensajes()

app.use('/productos', productoRoutes);
app.use('/nuevo-producto', frontRoutes);

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
            texto: data.texto
        };
        nuevomensaje.date = new Date().toLocaleDateString();
        await chats.guardar(nuevomensaje)
        io.sockets.emit('mensajes', await chats.leer())
    })
})