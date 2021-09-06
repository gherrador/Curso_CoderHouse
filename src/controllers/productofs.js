const { promises: { readFile, writeFile } } = require('fs');


class ProductoFs {
    constructor() {}


    async guardar(producto) {

        try {
            if (producto.nombre === "" || typeof producto.nombre === "undefined") return false;
            if (producto.descripcion === "" || typeof producto.descripcion === "undefined") return false;
            if (producto.codigo === "" || typeof producto.codigo === "undefined") return false;
            if (producto.foto === "" || typeof producto.foto === "undefined") return false;
            if (producto.precio === "" || typeof producto.precio === "undefined") return false;
            if (producto.stock === "" || typeof producto.stock === "undefined") return false;
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

    actualizarPorId = async(id, producto) => {
        try {
            if (producto.nombre === "" || typeof producto.nombre === "undefined") return false;
            if (producto.descripcion === "" || typeof producto.descripcion === "undefined") return false;
            if (producto.codigo === "" || typeof producto.codigo === "undefined") return false;
            if (producto.foto === "" || typeof producto.foto === "undefined") return false;
            if (producto.precio === "" || typeof producto.precio === "undefined") return false;
            if (producto.stock === "" || typeof producto.stock === "undefined") return false;
            const actualizar = await this.listar()
            const nuevo = actualizar.map((producto) => {
                if (producto.id === parseInt(id)) {
                    producto.nombre = producto.nombre
                    producto.precio = parseInt(producto.precio)
                    producto.descripcion = producto.descripcion
                    producto.codigo = producto.codigo
                    producto.foto = producto.foto
                    producto.stock = producto.stock
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