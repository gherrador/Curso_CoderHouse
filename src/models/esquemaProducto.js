const mongoose = require('mongoose');

const esquemaProducto = new mongoose.Schema({
    id: { type: Number, require: true },
    title: { type: String, require: true, max: 100 },
    price: { type: String, require: true, max: 100 },
    thumbnail: { type: String, require: true, max: 100 }
})

const Productos = mongoose.model('productos', esquemaProducto);

module.exports = Productos ;