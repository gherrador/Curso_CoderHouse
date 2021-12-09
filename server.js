const express = require("express");
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const frontRoutes = require('./src/routes/front');;
const { getConnection } = require("./config/index");
const { normalize, schema } = require('normalizr');
const MongoStore = require('connect-mongo')
const mensajesDB = require("./src/Services/message")
const chats = new mensajesDB;
const passport = require('passport');
const { logger, loggererror } = require('./src/Services/logger')
const cors = require('cors');
const { MONGO_URL, ACCOUNT_SID_TWILIO, AUTHTOKEN_TWILIO } = require("./config/global");
const productRouter = require('./src/Routes/products');
getConnection();

const PORT = process.env.PORT || 8080;

/* --------------------- SERVER --------------------------- */

const app = express();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
/* --------------------- MIDDLEWARE --------------------------- */
app.engine(
    'hbs', handlebars({
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials/'
    })
)
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: advancedOptions
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}));

app.use(passport.initialize());
app.use(passport.session());
require('./src/Services/passport')(passport);
app.use(cors())
    /* --------------------- ROUTES --------------------------- */

app.use("/", frontRoutes);
app.use("/productos", productRouter);

/* ---- TWILIO -----*/

const client = require('twilio')(ACCOUNT_SID_TWILIO, AUTHTOKEN_TWILIO);

/* ------ NORMALIZR -----------*/
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
        if (data.texto.toString().includes("administrador")) {
            client.messages.create({
                    body: `Mensaje enviado por ${data.autor.nombre} ${data.autor.apellido}. \n\n
                    Texto completo: \n\n
                    ${data.texto}`,
                    from: '+16304071972',
                    to: '+543512118923'
                })
                .then(message => console.log(message.sid))
                .catch(console.log)
        }
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

process.on('exit', function(code) {
    console.log('Exit code:' + code);
});

const server = httpServer.listen(PORT, () => {
    logger.info('El servidor esta corriendo en el puerto: ' + PORT);
});
server.on('error', err => {
    logger.info('Error message: ' + err);
    loggererror.error('Error message: ' + err);
});