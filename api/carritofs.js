const { promises: { readFile, writeFile } } = require('fs');
const ProductoFs = require('./productofs')
const Producto = new ProductoFs

class CarritoFs {
    constructor() {}

    async guardar(id) {
        try {
            const productosDB = await Producto.listar();
            const producto = productosDB.filter((producto) => producto.id == id)[0]
            const productocarrito = await this.listar()
            productocarrito.push(producto);
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
            const producto = products.filter((producto) => producto.id == id)[0]
            return producto
        } catch (err) {
            return []
        }
    }

    borrarPorId = async(id) => {
        try {
            const listado = await this.listar();
            const listadonuevo = listado.filter((producto) => producto.id !== parseInt(id));
            writeFile('./persistencia/carrito.txt', JSON.stringify(listadonuevo))
        } catch (err) {
            console.log('Imposible borrar producto');
        }
    }
}


module.exports = CarritoFs;