const mongoose = require('mongoose');

const esquemaMensaje = new mongoose.Schema({
    autor: {
        id: { type: String, require: true, max: 1000 },
        nombre: { type: String, require: true, max: 1000 },
        apellido: { type: String, require: true, max: 1000 },
        edad: { type: String, require: true, max: 1000 },
        alias: { type: String, require: true, max: 1000 },
        avatar: { type: String, require: true, max: 1000 },
    },
    texto: {
        id: { type: Number, require: true },
        texto: { type: String, require: true, max: 1000 },
    },
    date: { type: String, require: true, max: 1000 },

}, {
    versionKey: false
})

const Mensajes = mongoose.model('mensajes', esquemaMensaje)

module.exports = { Mensajes }