const control = require('../controllers/items')

module.exports = (router) => {
    router.post('/api/items', control.itemsCreate)
    router.get('/api/items/list', control.List)
    router.put('/api/items/actualizar/:id', control.actualizarPorId)
    router.delete('/api/items/borrar/:id', control.borrarPorId)
    return router;
};