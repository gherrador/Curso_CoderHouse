const { Usuarios } = require('../models/usuarioDB');


class UsuarioDB {
    constructor() {}

    insertar(Usuario) {
        return Usuarios.create(Usuario, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(res);
                return true;
            }
        });
    }

    listar() {
        return Usuarios.find({}, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(res)
            }
        }).lean();
    }
    cerrar() {
        mongoose.disconnect(err => { console.log('desconectado de la base') });
    }
}

module.exports = UsuarioDB;