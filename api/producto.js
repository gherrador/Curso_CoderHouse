let producto_memoria = []

const guardar = (producto) => {
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
    return producto
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

const actualizarPorId = (id, productonuevo) => {
    try {
        producto_memoria = producto_memoria.map((producto) => {
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