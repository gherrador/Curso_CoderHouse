const express = require("express");
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const frontRoutes = require('../src/routes/front');;
const { getConnection } = require("../config/connection");
const MongoStore = require('connect-mongo')
const passport = require('passport');
const cors = require('cors');
const { MONGO_URL} = require("../config/index");

/* --------------------- SERVER --------------------------- */

//socket.io server
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
/* --------------------- MIDDLEWARE --------------------------- */
app.engine(
    'hbs', handlebars({
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: __dirname + '/../views/layouts',
        partialsDir: __dirname + '/../views/partials/'
    })
)
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, '/../public')));
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
require('../src/Services/passport')(passport);
app.use(cors())

/* --------------------- ROUTES --------------------------- */
const routes = require("../src/Routes/Products/products")
app.use("/productos",routes())
app.use("/", frontRoutes);

// Chat
const ChatWebSocket = require("../src/Routes/Chat/chatWebsocket")
ChatWebSocket(io)

module.exports = {server, app}