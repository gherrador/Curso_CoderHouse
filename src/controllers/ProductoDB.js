const path = require('path')
const { daoProductos } = require(path.join(__dirname, '../models/esquemaProducto'));

class ProductoDB {
    constructor() {}


    guardar(data) {
        const producto = {
            timestamp: Date.now(),
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            foto: data.foto,
            precio: data.precio,
            stock: data.stock
        }

        return daoProductos.create(producto, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(res);
                return true;
            }
        });
    }

    listar() {
        return daoProductos.find({}, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                this.DB_PRODUCTOS = res
            }
        }).lean();
    }

    async listarPorId(id) {
        try {
            const productoid = await daoProductos.find({ _id: id }).lean()
            return productoid
        } catch {
            return false
        }
    }

    async listarPorNombre(nombre) {
        try {
            const producto_nombre = await daoProductos.find({ nombre: nombre }).lean();
            return producto_nombre
        } catch {
            throw new Error("No se encontro el producto")
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

    async listarPorPrecio(precioInferior, precioSuperior) {
        try {
            const producto_precio = await daoProductos.find({ $and: [{ precio: { $gte: precioInferior } }, { precio: { $lte: precioSuperior } }] }).lean()
            return producto_precio
        } catch {
            throw new Error("Producto no encontrado")
        }
    }

    async listarPorStock(stockInferior, stockSuperior) {
        try {
            const producto_stock = await daoProductos.find({ $and: [{ stock: { $gte: stockInferior } }, { stock: { $lte: stockSuperior } }] }).lean()
            return producto_stock
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
            const nuevoNombre = data.nombre;
            const nuevoDescripcion = data.descripcion;
            const nuevoCodigo = data.codigo;
            const nuevoFoto = data.foto;
            const nuevoPrecio = data.precio;
            const nuevoStock = data.stock;

            await daoProductos.updateOne({ id: id }, {
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

module.exports = ProductoDB;