const Productos = require('../models/esquemaProducto');
const { loggererror } = require('./logger')

const saveProductService = async (data) => {
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

const getListProductsService = async () => {
        try {
            const productList = await Productos.find({}).lean()
            return productList
        } catch {
            return false
        }
    }

const getProductByIdService = async (id) => {
        try {
            const productId = await Productos.find({ _id: id }).lean()
            return productId
        } catch {
            return false
        }
    }

const  deleteByIdService = async (id) => {
        try {
            await Productos.deleteOne({ _id: id })
            return true
        } catch {
            loggererror.error('Mensaje error ----------------->No se pudo borrar el producto')
        }
    }

const updateByidService = async (data) => {
        try {
            const id = data.id
            const nuevotitle = data.title;
            const nuevoprice = data.price;
            const nuevothumbnail = data.thumbnail;
            console.log(data)
            await Productos.updateOne({ _id: id }, {
                $set: {
                    title: nuevotitle,
                    price: nuevoprice,
                    thumbnail: nuevothumbnail
                }
            })
            return true;
        } catch {
            loggererror.error('Mensaje error ----------------->No se pudo actualizar el producto')
        }
    }

module.exports = {
    save: saveProductService,
    list: getListProductsService,
    listById: getProductByIdService,   
    deleteById: deleteByIdService,
    updateByid: updateByidService};
    