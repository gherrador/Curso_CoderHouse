class Carrito {
    constructor() {
        this.carrito = [];
    }

    agregar(producto) {
        this.carrito.push({
            id: this.carrito.length + 1,
            timestamp: Date.now(),
            producto: {
                id: producto.id,
                timestamp: producto.timestamp,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                codigo: producto.codigo,
                foto: producto.foto,
                precio: producto.precio,
                stock: producto.stock
            }
        });
        return true;
    }

    listar() {
        if (this.carrito.length < 1) return this.carrito
        return this.carrito;
    }

    listarPorId(id) {
        return this.carrito.filter((orden) => orden.id === parseInt(id))[0];
    }


    borrarPorId(id) {
        this.carrito = this.carrito.filter((orden) => orden.id !== parseInt(id));
    }
}

module.exports = Carrito;