const path = require('path')
const { daoCarritos } = require(path.join(__dirname, "../models/esquemaCarrito"));

class CarritoDB {

    constructor() {
        this.DB_PRODUCTOS = this.listar()
    }

    async guardar(producto) {
        try {
            const carrito = ({
                timestamp: Date.now(),
                producto: {
                    idProducto: producto._id,
                    timestampProducto: producto.timestamp,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    codigo: producto.codigo,
                    foto: producto.foto,
                    precio: producto.precio,
                    stock: producto.stock
                }
            })
            await daoCarritos.create(carrito)
            return true
        } catch {
            throw new Error("Producto no encontrado")
        }
    }

    async listar() {
        try {
            const productos = await daoCarritos.find({}).lean();
            return productos
        } catch {
            throw new Error("No existe productos para listar")
        }
    }

    async listarPorId(id) {
        try {
            const productoid = await daoCarritos.find({ _id: id }).lean()
            return productoid
        } catch {
            return false
        }
    }

    async listarPorNombre(nombre) {
        try {
            const producto_nombre = await daoCarritos.find({ nombre: nombre }).lean();
            return producto_nombre
        } catch {
            throw new Error("No se encontro el producto")
        }
    }

    async listarPorCodigo(codigo) {
        try {
            const producto_codigo = await daoCarritos.find({ codigo: codigo }).lean();
            return producto_codigo
        } catch {
            throw new Error("Producto no encontrado")
        }
    }

    async listarPorPrecio(precioInferior, precioSuperior) {
        try {
            const producto_precio = await daoCarritos.find({ $and: [{ precio: { $gte: precioInferior } }, { precio: { $lte: precioSuperior } }] }).lean()
            return producto_precio
        } catch {
            throw new Error("Producto no encontrado")
        }
    }

    async listarPorStock(stockInferior, stockSuperior) {
        try {
            const producto_stock = await daoCarritos.find({ $and: [{ stock: { $gte: stockInferior } }, { stock: { $lte: stockSuperior } }] }).lean()
            return producto_stock
        } catch {
            throw new Error("Producto no encontrado")
        }
    }

    async borrarPorId(id) {
        try {
            await daoCarritos.deleteOne({ _id: id })
            return true
        } catch {
            throw new Error("Producto no encontrado o error al borrarlo")
        }
    }

    async actualizarPorId(data) {
        try {
            const id = data.id
            const nuevoNombre = data.nombre;
            const nuevoDescripcion = data.descripcion;
            const nuevoCodigo = data.codigo;
            const nuevoFoto = data.foto;
            const nuevoPrecio = data.precio;
            const nuevoStock = data.stock;

            await daoCarritos.updateOne({ id: id }, {
                $set: {
                    nombre: nuevoNombre,
                    descripcion: nuevoDescripcion,
                    codigo: nuevoCodigo,
                    foto: nuevoFoto,
                    precio: nuevoPrecio,
                    stock: nuevoStock,
                }
            })
            return true;
        } catch {
            throw new Error("Producto no encontrado o error al borrarlo")
        }
    }
}
module.exports = CarritoDB;