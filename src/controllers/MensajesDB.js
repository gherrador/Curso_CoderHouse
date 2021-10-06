const { Mensajes } = require("../models/esquemaMensaje")

class MensajesDB {
    constructor() {}

    crearTabla() {
        return Mensajes.create({}, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        });
    }

    async guardar(normalizedData) {
        try {
            const mensajeguardado = await Mensajes.create(normalizedData)
            return mensajeguardado
        } catch {
            return "imposible guardar mensajes"
        }
    }


    async leer() {
        try {
            const mensajesdata = await Mensajes.find({}).lean()
            return mensajesdata
        } catch {
            return "imposible leer data"
        }
    }
}

module.exports = MensajesDB;