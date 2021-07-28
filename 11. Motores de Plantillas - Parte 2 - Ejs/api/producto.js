class Producto {
    constructor() {
        this.productos = [];
    }

    guardar(producto) {
        producto.id = this.productos.length + 1
        this.productos.push(producto)
        return producto
    }


    listar() {
        if (this.productos.length == 0) {
            return false
        }
        return this.productos
    }

    obtenerPorId(id) {
        const producto = this.productos.filter((producto) => producto.id == id)[0]
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

module.exports = Producto