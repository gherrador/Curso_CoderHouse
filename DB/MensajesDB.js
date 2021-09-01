const knex = require('knex');

class MensajesDB {
    constructor(config) {
        this.knex = knex(config)
    }


    crearTablaMensajes() {
        return this.knex.schema.hasTable('mensajes')
            .then((existe) => {
                if (!existe) {
                    return this.knex.schema.createTable('mensajes', table => {
                        table.increments('id').primary();
                        table.string('autor').notNullable();
                        table.string('texto');
                        table.string('date');
                    })
                }
            })
    }

    guardar(mensaje) {
        return this.knex('mensajes').insert(mensaje)
    }

    leer() {
        return this.knex('mensajes').select()
    }
}

module.exports = MensajesDB;