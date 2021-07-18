class Productos {

    constructor() {
        this.productos = [];
    }

    guardar(producto) {
        this.productos.push(producto)
        for (let i = 0; i < this.productos.length; i++) {
            this.productos[i].id = (i + 1);
        }
        return producto
    }

    listar() {
        if (this.productos.length == 0) {
            throw new Error('no hay productos cargados');
        }
        return this.productos
    }

    obtenerPorId(id) {
        const producto = this.productos.filter((producto) => producto.id == id)[0]
        if (!producto) {
            throw new Error('producto no encontrado');
        }
        return producto
    }

    actualizarPorId(id, productonuevo) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                this.productos[i] = productonuevo
                productonuevo.id = JSON.parse(id)
                return productonuevo
            }
        }
        throw new Error('No existe el producto a actualizar')
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

module.exports = Productos