const { promises: { readFile, writeFile } } = require('fs');

class CarritoFs {
    constructor() {}


    async guardar(data) {
        try {
            let productos = await this.listar()
            const productoAguardar = {
                id: productos.length + 1,
                timestamp: Date.now(),
                nombre: data.nombre,
                descripcion: data.descripcion,
                codigo: data.codigo,
                foto: data.foto,
                precio: data.precio,
                stock: data.stock
            };
            productos.push(productoAguardar);
            await writeFile('./persistencia/carrito.txt', JSON.stringify(productos, null))
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