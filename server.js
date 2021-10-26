const express = require("express");
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const productoRoutes = require('./src/routes/productos');;
const frontRoutes = require('./src/routes/front');;
const { getConnection } = require("./src/controllers/app");
const { normalize, schema } = require('normalizr');
const MongoStore = require('connect-mongo')
const mensajesDB = require("./src/controllers/MensajesDB")
const chats = new mensajesDB;
const { Usuarios } = require('./src/models/usuarioDB');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bCrypt = require('bcrypt');
getConnection();

/* ------------- VALIDATE PASSWORD ---------------- */

const isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
}
let createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

/* ------------------ PASSPORT -------------------- */

passport.use('signup', new LocalStrategy({ passReqToCallback: true }, async(req, username, password, done) => {
    const { direccion } = req.body
    findOrCreateUser = function() {
        Usuarios.findOne({ 'username': username }, function(err, user) {
            if (err) {
                console.log('error al registrar:' + err)
                return done(err)
            }
            if (user) {
                console.log('el usuario ya existe')
                return done(null, false)
            } else {
                let nuevo_usuario = new Usuarios();
                nuevo_usuario.username = username;
                nuevo_usuario.password = createHash(password);
                nuevo_usuario.direccion = direccion
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

passport.use('login', new LocalStrategy({ passReqToCallback: true }, async(req, username, password, done) => {
    Usuarios.findOne({ 'username': username },
        function(err, user) {
            if (err)
                return done(err)
            if (!user) {
                console.log('usuario no encontrado con el nombre:' + username)
                return done(null, false)
            }
            if (!isValidPassword(user, password)) {
                console.log('password incorrecto')
                return done(null, false)
            }
            return done(null, user)
        }
    )
}))

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(async function(username, done) {
    Usuarios.findOne({ 'username': username }, function(err, user) {
        done(err, user)
    })
});

/* --------------------- SERVER --------------------------- */
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
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
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://user-coder:barby089@codersql.ztxhn.mongodb.net/sesiones?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}));
app.use(passport.initialize());
app.use(passport.session());

/* --------------------- ROUTES --------------------------- */

app.use("/productos", productoRoutes);
app.use("/", frontRoutes);

// LOGIN
app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), getLogin);
app.get('/faillogin', (req, res) => {
    res.render('login-error', {});
})

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        let user = req.user.username
        console.log('usuario logeado');
        res.render('index', {
            active: 'index',
            usuario: user
        })
    } else {
        console.log('error al logear usuario')
        res.render('login')
    }
}

//SIGNUP
app.get('/signup', getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failregister' }), postSignup)
app.get('/failregister', (req, res) => {
    res.render('register-error', {});
})

function getSignup(req, res) {
    res.render('signup')
}

function postSignup(req, res) {
    let user = req.user.username
    console.log('usuario logeado');
    res.render('index', {
        active: 'index',
        usuario: user

    })
}
/* --------- LOGOUT ---------- */
app.get('/logout', (req, res) => {
    let user = req.user.username
    req.logout();
    res.render('adios', {
        active: 'adios',
        usuario: user
    })
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