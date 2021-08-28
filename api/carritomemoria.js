const productos = require('./producto')

let carrito_memoria = [];


const guardar = (id) => {
    try {
        let productosDB = [];
        productosDB = productos.listar();
        let producto = productosDB.filter((producto) => producto.id == id)[0]
        carrito_memoria.push(producto);
        return "Producto guardado en carrito";
    } catch (err) {
        console.log('error al guardar')
    }
}

const listar = () => {
    try {
        if (carrito_memoria.length == 0) return false
        return carrito_memoria;
    } catch (err) {
        console.log('Sucedio un error inesperado', err);
    }
}

const listarPorId = (id) => {
    try {
        let producto = carrito_memoria.filter((producto) => producto.id == id)[0]
        return producto
    } catch (err) {
        return []
    }
}

const borrarPorId = (id) => {
    let producto = carrito_memoria.filter((producto) => producto.id == id)
    let productoABorrar = carrito_memoria.filter((producto) => producto.id != id)
    if (!producto) {
        throw new Error('producto no encontrado');
    }
    carrito_memoria = productoABorrar
    return "Producto Borrado"
}


module.exports = { guardar, listar, listarPorId, borrarPorId };