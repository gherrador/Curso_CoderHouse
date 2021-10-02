const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
app.use(express.static("./public"))
http.listen(8080, () => console.log("server on"))
const handlebars = require('express-handlebars');
const productoRoutes = require('./src/routes/productos');
const frontRoutes = require('./src/routes/front');
const { getConnection } = require("./src/controllers/app");
const { denormalize, normalize, schema } = require('normalizr');
const util = require('util');
const mensajesDB = require("./src/controllers/MensajesDB")
const chats = new mensajesDB;
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

const autor = new schema.Entity("autor");
const mensaje = new schema.Entity('mensaje', { autor: autor }, { idAttribute: (value) => (value._id ? `${value._id.toString()}` : value.id) }, {
    autor: autor,

});
const mensajes = new schema.Entity('mensajes', {
    mensajes: [mensaje]
})


io.on('connection', async(socket) => {
    console.log('Cliente conectado');
    let datadb = await chats.leer()
    const data = {
        id: "1000",
        mensajes: datadb
    }
    const normalizedData = normalize(data, mensajes);
    io.sockets.emit('mensajes', normalizedData)
    socket.on('nuevo_mensaje', async(data) => {
        const nuevomensaje = {
            autor: {
                id: data.autor.id,
                nombre: data.autor.nombre,
                apellido: data.autor.apellido,
                edad: data.autor.edad,
                alias: data.autor.alias,
                avatar: data.autor.avatar
            },
            texto: {
                id: datadb.length + 1,
                texto: data.texto
            },
            date: new Date().toLocaleDateString()
        };
        await chats.guardar(nuevomensaje)
        let datamensajenuevo = await chats.leer()
        const datamensaje = {
            id: "1000",
            mensajes: datamensajenuevo
        }
        const normalizedData = normalize(datamensaje, mensajes);
        socket.emit('mensajes', normalizedData)
    })
})