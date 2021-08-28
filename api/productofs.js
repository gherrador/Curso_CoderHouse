const { promises: { readFile, writeFile } } = require('fs');

class ProductoFs {
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
            await writeFile('./persistencia/productos.txt', JSON.stringify(productos, null))
            return true;
        } catch (err) {
            console.log('error al guardar')
        }
    }

    listar = async() => {
        try {
            const contenido = await readFile('./persistencia/productos.txt', 'utf-8')
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

    actualizarPorId = async(id, data) => {
        try {
            const actualizar = await this.listar()
            const nuevo = actualizar.map((producto) => {
                if (producto.id === parseInt(id)) {
                    producto.nombre = data.nombre
                    producto.precio = parseInt(data.precio)
                    producto.descripcion = data.descripcion
                    producto.codigo = data.codigo
                    producto.foto = data.foto
                    producto.stock = data.stock
                }
                return producto;
            });
            await writeFile('./persistencia/productos.txt', JSON.stringify(nuevo, null))
            return true;
        } catch (err) {
            console.log('Fue imposible actualizar el producto');
        }
    }

    borrarPorId = async(id) => {
        try {
            const listado = await this.listar();
            const listadonuevo = listado.filter((producto) => producto.id !== parseInt(id));
            writeFile('./persistencia/productos.txt', JSON.stringify(listadonuevo))
        } catch (err) {
            console.log('Imposible borrar producto');
        }
    }
}

module.exports = ProductoFs;