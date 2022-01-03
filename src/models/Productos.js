const { Schema, model } = require("mongoose");

const esquemaProducto = new Schema({
    id: { type: Number, require: true },
    title: { type: String, require: true, max: 100 },
    price: { type: String, require: true, max: 100 },
    thumbnail: { type: String, require: true, max: 100 }
})

module.exports = model('productos', esquemaProducto);

