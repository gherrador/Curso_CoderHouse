const mongoose = require('mongoose');

const esquemaUsuario = new mongoose.Schema({
    username: { type: String, require: true, max: 100 },
    password: { type: String, require: true, max: 100 },
    direccion: { type: String, require: true, max: 100 }
})

const Usuarios = mongoose.model('usuarios', esquemaUsuario);

module.exports = { Usuarios };