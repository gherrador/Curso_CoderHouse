class Productos {
    constructor() {
        this.productos = [];
    }

    guardar(producto) {
        producto.id = this.productos.length + 1
        this.productos.push(producto);
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
}
module.exports = Productos