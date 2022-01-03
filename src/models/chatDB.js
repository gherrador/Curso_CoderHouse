const mongoose = require('mongoose');

const esquemaMensaje = new mongoose.Schema({
    autor: {
        id: { type: String, require: true, max: 1000 },
        nombre: { type: String, require: true, max: 1000 },
        username: { type: String, require: true, max: 1000 },        
        foto: { type: String, require: true, max: 1000 },        
    },
    texto:{ type: String, require: true, max: 1000 },    
    date: { type: String, require: true, max: 1000 },

}, {
    versionKey: false
})

const Mensajes = mongoose.model('mensajes', esquemaMensaje)

module.exports = { Mensajes }