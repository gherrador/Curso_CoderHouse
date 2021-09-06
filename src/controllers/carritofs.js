const { promises: { readFile, writeFile } } = require('fs');
const path = require('path')
const ProductoFs = require(path.join(__dirname, './productofs'))
const Producto = new ProductoFs

class CarritoFs {
    constructor() {}

    async guardar(id) {
        try {
            const productosDB = await Producto.listar();
            const producto = productosDB.filter((producto) => producto.id == id)[0]
            const productocarrito = await this.listar()
            productocarrito.push({
                idCarrito: productocarrito.length + 1,
                timeStamp: Date.now(),
                producto: {...producto
                }
            });
            await writeFile('./persistencia/carrito.txt', JSON.stringify(productocarrito, null))
            return true;
        } catch (err) {
            console.log('error al guardar')
        }
    }

    listar = async() => {
        try {
            const contenido = await readFile('./persistencia/carrito.txt', 'utf-8')
            return (JSON.parse(contenido))
        } catch (err) {
            return [];
        }
    }

    listarPorId = async(id) => {
        try {
            const products = await this.listar();
            const producto = products.filter((producto) => producto.idCarrito == id)[0]
            return producto
        } catch (err) {
            return []
        }
    }

    borrarPorId = async(id) => {
        try {
            const listado = await this.listar();
            const listadonuevo = listado.filter((producto) => producto.idCarrito !== parseInt(id));
            writeFile('./persistencia/carrito.txt', JSON.stringify(listadonuevo))
        } catch (err) {
            console.log('Imposible borrar producto');
        }
    }
}


module.exports = CarritoFs;