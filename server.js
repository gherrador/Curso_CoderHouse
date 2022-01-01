const express = require("express");
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const frontRoutes = require('./src/routes/front');;
const { getConnection } = require("./config/connection");
const MongoStore = require('connect-mongo')
const passport = require('passport');
const { logger, loggererror } = require('./src/Services/logger')
const cors = require('cors');
const { MONGO_URL} = require("./config/index");
getConnection();

const PORT = process.env.PORT || 9000;

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
const routes = require("./src/Routes/Products/products")
app.use("/productos",routes())
app.use("/", frontRoutes);
process.on('exit', function(code) {
    logger.info('Exit code:' + code);
});

const server = httpServer.listen(PORT, () => {
    logger.info('El servidor esta corriendo en el puerto: ' + PORT);
});
server.on('error', err => {
    logger.info('Error message: ' + err);
    loggererror.error('Error message: ' + err);
});

module.exports = { app, server }