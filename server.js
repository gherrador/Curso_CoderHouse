const express = require("express");
const app = express();
const path = require('path')
const handlebars = require('express-handlebars');
const productoRoutes = require(path.join(__dirname, './src/routes/productos'));
const frontRoutes = require(path.join(__dirname, './src/routes/front'));
const { getConnection } = require(path.join(__dirname, "./src/controllers/app"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const mensajesDB = require(path.join(__dirname, './src/controllers/MensajesDB'))
const chats = new mensajesDB;
const puerto = 8080;
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});
server.on('error', error => {
    console.log('error en el servidor:', error);
});

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
app.use('/index', frontRoutes);
app.use(express.static("public"))

getConnection();

const SocketIO = require('socket.io');
const io = SocketIO(server);

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