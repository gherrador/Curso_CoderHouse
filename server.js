'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require("express");
var app = express();
var path = require('path');
var handlebars = require('express-handlebars');
var productoRoutes = require('./routes/productos');
require("babel-core/register");
require("babel-polyfill");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
var chat = require('./public/chat');
var puerto = 8080;
var server = app.listen(puerto, function () {
    console.log('servidor escuchando en http://localhost:' + puerto);
});
server.on('error', function (error) {
    console.log('error en el servidor:', error);
});
var chats = new chat();
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', '.hbs');
app.set('views', './views');
app.get('/index', function (req, res) {
    res.sendFile('index.html', { root: __dirname });
});
app.use('/api/productos', productoRoutes);

var SocketIO = require('socket.io');
var io = SocketIO(server);

var listaProductos = [];
var mensajes = 0;

io.on('connection', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(socket) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log('Cliente conectado');
                        socket.emit('lista', listaProductos);

                        socket.on('listado', function (data) {
                            listaProductos.push(data);
                            console.log('Producto Cargado');
                            mensajes++;
                            io.sockets.emit('lista', listaProductos);
                        });

                        _context2.t0 = socket;
                        _context2.next = 6;
                        return chats.leer();

                    case 6:
                        _context2.t1 = _context2.sent;

                        _context2.t0.emit.call(_context2.t0, 'mensajes', _context2.t1);

                        socket.on('nuevo_mensaje', function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _context.next = 2;
                                                return chats.guardar(data.autor, data.texto);

                                            case 2:
                                                _context.t0 = io.sockets;
                                                _context.next = 5;
                                                return chats.leer();

                                            case 5:
                                                _context.t1 = _context.sent;

                                                _context.t0.emit.call(_context.t0, 'mensajes', _context.t1);

                                            case 7:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            }));

                            return function (_x2) {
                                return _ref2.apply(this, arguments);
                            };
                        }());

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());
