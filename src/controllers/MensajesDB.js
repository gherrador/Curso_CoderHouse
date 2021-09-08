const path = require('path')
const { daoMensajes } = require(path.join(__dirname, "../models/esquemaMensaje"));

class MensajesDB {
    constructor() {}

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