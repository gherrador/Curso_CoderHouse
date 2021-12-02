const path = require('path')
const { Productos } = require('../models/esquemaProducto');

class ProductoDB {
    constructor() { }

    async guardar(data) {
        try {
            const producto = {
                timestamp: Date.now(),
                title: data.title,
                price: data.price,
                thumbnail: data.thumbnail
            }

            const productocreado = await Productos.create(producto)
            return productocreado
        } catch {
            return false
        }
    }


    async listar() {
        try {
            const productoslista = await Productos.find({}).lean()
            return productoslista
        } catch {
            return false
        }
    }

    async listarPorId(id) {
        try {                    
            const productoid = await Productos.findOne({ _id: id }).lean()
            return productoid
        } catch {
            return false
        }
    }

    async listarPorCodigo(codigo) {
        try {
            const producto_codigo = await Productos.find({ codigo: codigo }).lean();
            return producto_codigo
        } catch {
            throw new Error("Producto no encontrado")
        }
    }
    async borrarPorId(id) {
        try {
            await Productos.deleteOne({ _id: id })
            return true
        } catch {
            throw new Error("Producto no encontrado o error al borrarlo")
        }
    }
    async actualizarPorId(data) {
        try {
            await Productos.updateOne({ _id: data.id }, {
                $set: {
                    title: data.title,
                    thumbnail: data.thumbnail,
                    price: data.price,
                }
            })
            return true;
        } catch {
            throw new Error("Producto no encontrado o error al borrarlo")
        }
    }
    async actualizar(id, data) {
        try {
            await Productos.updateOne({ _id: id }, {
                $set: {
                    title: data.title,
                    price: data.price,
                    thumbnail: data.thumbnail
                }
            })
            return true
        } catch {
            throw new Error("Producto no encontrado o error al borrarlo")
        }
    }
}

module.exports = ProductoDB;