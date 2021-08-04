const express = require("express");
const app = express();
const path = require('path')
const handlebars = require('express-handlebars');
const productoRoutes = require('./routes/productos');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const chat = require('./public/chat');
const puerto = 8080;
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});
server.on('error', (err:any) => {
    console.log('error en el servidor:'+ err);
});
const chats = new chat();
app.engine(
    'hbs', handlebars({
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials/'
    })
)
app.set('view engine', '.hbs');
app.set('views', './views');
app.get('/index', (req:any, res:any) => {
    res.sendFile('index.html', { root: __dirname })
})
app.use('/api/productos', productoRoutes);

const SocketIO = require('socket.io')
const io = SocketIO(server)

const listaProductos:any = []
let mensajes:number = 0

io.on('connection', async(socket:any) => {
    console.log('Cliente conectado');
    socket.emit('lista', listaProductos)

    socket.on('listado', (data:any) => {
        listaProductos.push(data);
        console.log('Producto Cargado');
        mensajes++
        io.sockets.emit('lista', listaProductos)
    })

    socket.emit('mensajes', await chats.leer())


    socket.on('nuevo_mensaje', async(data:any) => {

        await chats.guardar(data.autor, data.texto)
        io.sockets.emit('mensajes', await chats.leer())
    })
})