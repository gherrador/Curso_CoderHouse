const mongoose = require('mongoose');

const esquemaCarrito = new mongoose.Schema({
    timestamp: { type: String, require: true, max: 100000 },
    producto: {
        idProducto: { type: String, require: true, max: 100000 },
        timestampProducto: { type: String, require: true, max: 10000 },
        nombre: { type: String, require: true, max: 100000 },
        descripcion: { type: String, require: true, max: 100000 },
        codigo: { type: String, require: true, max: 100000 },
        foto: { type: String, require: true, max: 10000 },
        precio: { type: Number, require: true, max: 10000 },
        stock: { type: Number, require: true, max: 100000 }
    }
})

const daoCarritos = mongoose.model('carritos', esquemaCarrito);

module.exports = { daoCarritos };