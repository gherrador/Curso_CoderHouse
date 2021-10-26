const express = require("express");
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const productoRoutes = require('./src/routes/productos');;
const frontRoutes = require('./src/routes/front');;
const { getConnection } = require("./src/controllers/app");
const { normalize, schema } = require('normalizr');
const MongoStore = require('connect-mongo')
const mensajesDB = require("./src/controllers/MensajesDB")
const chats = new mensajesDB;
const { Usuarios } = require('./src/models/usuarioDB');
const passport = require('passport');
const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = require('./config/global');
const FacebookStrategy = require('passport-facebook').Strategy
getConnection();
/* ------------------ PASSPORT -------------------- */
const facebook_client_id = FACEBOOK_CLIENT_ID;
const facebook_client_secret = FACEBOOK_CLIENT_SECRET;

passport.use(new FacebookStrategy({
    clientID: facebook_client_id.toString(),
    clientSecret: facebook_client_secret.toString(),
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email']
}, async function(accessToken, refreshToken, userProfile, done) {
    let datos = userProfile
    console.log(datos)
    findOrCreateUser = function() {
        Usuarios.findOne({ 'userProfile.displayName': userProfile.displayName }, function(err, user) {
            if (err) {
                console.log('error al registrar:' + err)
                return done(err)
            }
            if (user) {
                console.log('el usuario ya existe')
                return done(null, false)
            } else {
                var nuevo_usuario = new Usuarios();
                nuevo_usuario.username = userProfile.displayName,
                    nuevo_usuario.facebookId = userProfile.id,
                    nuevo_usuario.email = userProfile.emails[0].value,
                    nuevo_usuario.foto = userProfile.photos[0].value,
                    nuevo_usuario.save(function(err) {
                        if (err) {
                            console.log('error al guardar el usuario:' + err)
                            throw err;
                        }
                        console.log('usuario registrado exitosamente')
                        return done(null, nuevo_usuario)
                    })
            }
        })
    }
    process.nextTick(findOrCreateUser)
}))

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(async function(username, done) {
    Usuarios.findOne({ 'username': username }, function(err, username) {
        done(err, username)
    }).lean()
});

/* --------------------- SERVER --------------------------- */
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
    /* --------------------- MIDDLEWARE --------------------------- */
app.engine(
    'hbs', handlebars({
        hbs: allowInsecurePrototypeAccess(handlebars),
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
        mongoUrl: 'mongodb+srv://user-coder:barby089@codersql.ztxhn.mongodb.net/sesiones?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}));

app.use(passport.initialize());
app.use(passport.session());
/* --------------------- ROUTES --------------------------- */


app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }))
app.use("/productos", productoRoutes);
app.use("/", frontRoutes);

// LOGIN

app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/', (req, res) => {
    res.render('index', { user: req.user })
})

/* --------- LOGOUT ---------- */
app.get('/logout', (req, res) => {
    res.render('adios', { user: req.user })
})

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
http.listen(8080, () => console.log("server on"))