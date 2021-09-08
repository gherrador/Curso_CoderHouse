const path = require('path')
const { daoProductos } = require(path.join(__dirname, '../models/esquemaProducto'));

class ProductoDB {
    constructor() {}

    async guardar(data) {
        try {
            const producto = {
                timestamp: Date.now(),
                title: data.title,
                price: data.price,
                thumbnail: data.thumbnail
            }

            const productocreado = await daoProductos.create(producto)
            return productocreado
        } catch {
            return false
        }
    }


    async listar() {
        try {
            const productoslista = await daoProductos.find({}).lean()
            return productoslista
        } catch {
            return false
        }
    }

    async listarPorId(id) {
        try {
            const productoid = await daoProductos.find({ _id: id }).lean()
            return productoid
        } catch {
            return false
        }
    }

    async listarPorCodigo(codigo) {
        try {
            const producto_codigo = await daoProductos.find({ codigo: codigo }).lean();
            return producto_codigo
        } catch {
            throw new Error("Producto no encontrado")
        }
    }
    async borrarPorId(id) {
        try {
            await daoProductos.deleteOne({ _id: id })
            return true
        } catch {
            throw new Error("Producto no encontrado o error al borrarlo")
        }
    }

    async actualizarPorId(data) {
        try {
            const id = data.id
            const nuevotitle = data.title;
            const nuevoprice = data.price;
            const nuevothumbnail = data.thumbnail;
            await daoProductos.updateOne({ id: id }, {
                $set: {
                    title: nuevotitle,
                    price: nuevoprice,
                    thumbnail: nuevothumbnail
                }
            })
            return true;
        } catch {
            throw new Error("Producto no encontrado o error al borrarlo")
        }
    }
}

module.exports = ProductoDB;