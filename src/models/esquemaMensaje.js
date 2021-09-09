const mongoose = require('mongoose');

const esquemaMensaje = new mongoose.Schema({
    id: { type: Number, require: true },
    autor: { type: String, require: true, max: 1000 },
    texto: { type: String, require: true, max: 1000 },
    date: { type: String, require: true, max: 1000 }
})
const daoMensajes = mongoose.model('mensajes', esquemaMensaje)

module.exports = { daoMensajes }