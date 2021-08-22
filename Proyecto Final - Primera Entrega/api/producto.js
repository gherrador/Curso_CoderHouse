class Producto {
    constructor() {
        this.productos = [];
    }

    guardar(producto) {
        producto.id = this.productos.length + 1
        this.productos.push({
            id: producto.id,
            timestamp: Date.now(),
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            codigo: producto.codigo,
            foto: producto.foto,
            precio: producto.precio,
            stock: producto.stock
        });
        return producto
    }

    listar() {
        if (this.productos.length == 0) {
            throw new Error('no hay productos cargados');
        }
        return this.productos
    }

    listarPorId(id) {
        const producto = this.productos.filter((producto) => producto.id == id)[0]
        if (!producto) {
            throw new Error('producto no encontrado');
        }
        return producto
    }

    actualizarPorId(id, productonuevo) {
        try {
            this.productos = this.productos.map((producto) => {
                if (producto.id === parseInt(id)) {
                    producto.nombre = productonuevo.nombre
                    producto.precio = parseInt(productonuevo.precio)
                    producto.descripcion = productonuevo.descripcion
                    producto.codigo = productonuevo.codigo
                    producto.foto = productonuevo.foto
                    producto.stock = productonuevo.stock
                }
                return producto;
            });
            return true;
        } catch (err) {
            console.log('Ups. algo paso'.err);
        }
    }

    borrarPorId(id) {
        let producto = this.productos.filter((producto) => producto.id == id)
        let productoABorrar = this.productos.filter((producto) => producto.id != id)
        if (!producto) {
            throw new Error('producto no encontrado');
        }
        this.productos = productoABorrar
        return producto
    }
}

module.exports = Producto