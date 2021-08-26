const db = require('../src/models/db/db');

const createItem = ({ Nombre, Categoria, Stock }) =>
    db(process.env.T_TABLE).insert({
        Nombre,
        Categoria,
        Stock
    })

const list = () =>
    db.select().from(process.env.T_TABLE)

const update = (id, data) =>
    db(process.env.T_TABLE).where('id', id).update({
        Stock: data.Stock
    })

const borrar = (id) =>
    db(process.env.T_TABLE).where('id', id).del()



module.exports = { list, createItem, update, borrar }