const service = require('../../service/items')

const itemsCreate = (req, res) =>
    service
    .createItem(req.body)
    .then(() => res.status(200).json({
        msg: 'items created',
        ...req.body,
    }))
    .catch((e) => res.json({ e }))

const List = (req, res) =>
    service
    .list()
    .then((response) => res.json(response))
    .catch((e) => res.status(200).send({ e }))

const actualizarPorId = (req, res) => {
    const itemactualizado = req.body
    service
        .update(req.params.id, itemactualizado)
        .then((res) => res.status(200).send(res))
        .catch((e) => res.json(e))
};

const borrarPorId = (req, res) => {
    service
        .borrar(req.params.id)
        .then((res) => res.status(200).send(res))
        .catch((e) => res.json(e))
}

module.exports = { List, itemsCreate, actualizarPorId, borrarPorId }