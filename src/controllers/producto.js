let producto_memoria = []

const guardar = (producto) => {
    if (producto.nombre === "" || typeof producto.nombre === "undefined") return false;
    if (producto.descripcion === "" || typeof producto.descripcion === "undefined") return false;
    if (producto.codigo === "" || typeof producto.codigo === "undefined") return false;
    if (producto.foto === "" || typeof producto.foto === "undefined") return false;
    if (producto.precio === "" || typeof producto.precio === "undefined") return false;
    if (producto.stock === "" || typeof producto.stock === "undefined") return false;
    producto.id = producto_memoria.length + 1
    producto_memoria.push({
        id: producto.id,
        timestamp: Date.now(),
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        codigo: producto.codigo,
        foto: producto.foto,
        precio: producto.precio,
        stock: producto.stock
    });
    return producto_memoria
}


const listar = () => {
    try {
        if (producto_memoria.length < 1) return false
        return producto_memoria;
    } catch (err) {
        console.log('Sucedio un error inesperado', err);
    }
}

const listarPorId = (id) => {
    const producto = producto_memoria.filter((producto) => producto.id == id)[0]
    if (!producto) {
        throw new Error('producto no encontrado');
    }
    return producto
}

const actualizarPorId = (id, producto) => {
    try {
        if (producto.nombre === "" || typeof producto.nombre === "undefined") return false;
        if (producto.descripcion === "" || typeof producto.descripcion === "undefined") return false;
        if (producto.codigo === "" || typeof producto.codigo === "undefined") return false;
        if (producto.foto === "" || typeof producto.foto === "undefined") return false;
        if (producto.precio === "" || typeof producto.precio === "undefined") return false;
        if (producto.stock === "" || typeof producto.stock === "undefined") return false;
        producto_memoria = producto_memoria.map((producto) => {
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
        return true;
    } catch (err) {
        console.log('Ups. algo paso', err);
    }
}
const borrarPorId = (id) => {
    let producto = producto_memoria.filter((producto) => producto.id == id)
    let productoABorrar = producto_memoria.filter((producto) => producto.id != id)
    if (!producto) {
        throw new Error('producto no encontrado');
    }
    producto_memoria = productoABorrar
    return producto
}


module.exports = { guardar, listar, listarPorId, actualizarPorId, borrarPorId }