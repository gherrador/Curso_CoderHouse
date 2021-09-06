const { promises: { readFile, writeFile } } = require('fs');

class ProductoFs {
    constructor() {}


    async guardar(producto) {

        try {
            if (producto.nombre === "" || producto.descripcion === "" || producto.codigo === "" || producto.foto === "" || producto.precio === "" || producto.stock === "") return false;
            if (producto.nombre === undefined || producto.descripcion === undefined || producto.codigo === undefined || producto.foto === undefined || producto.precio === undefined || producto.stock === undefined) return false;
            if (producto.precio < 0 || producto.stock < 0) return false;
            let productos = await this.listar()
            producto.id = productos.length + 1;
            const productoAguardar = {
                id: producto.id,
                timestamp: Date.now(),
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                codigo: producto.codigo,
                foto: producto.foto,
                precio: producto.precio,
                stock: producto.stock
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
            let products = await this.listar();
            let producto = products.filter((producto) => producto.id == id)[0]
            return producto
        } catch (err) {
            return []
        }
    }

    actualizarPorId = async(id, data) => {
        try {
            if (data.nombre === "" || data.descripcion === "" || data.codigo === "" || data.foto === "" || data.precio === "" || data.stock === "") return false;
            if (data.nombre === undefined || data.descripcion === undefined || data.codigo === undefined || data.foto === undefined || data.precio === undefined || data.stock === undefined) return false;
            if (data.precio < 0 || data.stock < 0) return false;
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