const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/ecommerce';

const esquemaMensaje = new mongoose.Schema({
    id: { type: Number, require: true },
    autor: { type: String, require: true, max: 1000 },
    texto: { type: String, require: true, max: 1000 },
    date: { type: String, require: true, max: 1000 }
})
const daoMensajes = mongoose.model('mensajes', esquemaMensaje)

class MensajesDB {
    constructor() {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Conectado a la base en constructor de archivoDb');
            }
        })
    }

    crearTabla() {
        return daoMensajes.create({}, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        });
    }

    guardar(mensaje) {
        return daoMensajes.create(mensaje, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(res);
            }
        });
    }

    leer() {
        return daoMensajes.find({}, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(res)
            }
        });
    }
}

module.exports = MensajesDB;