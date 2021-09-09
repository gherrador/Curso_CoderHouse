const mongoose = require('mongoose');

const esquemaProducto = new mongoose.Schema({
    timestamp: { type: String, require: true, max: 1000 },
    nombre: { type: String, require: true, max: 1000 },
    descripcion: { type: String, require: true, max: 1000 },
    codigo: { type: String, require: true, max: undefined },
    foto: { type: String, require: true, max: undefined },
    precio: { type: Number, require: true, max: undefined },
    stock: { type: Number, require: true, max: undefined }
})

const daoProductos = mongoose.model('productos', esquemaProducto);

module.exports = { daoProductos };