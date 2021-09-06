let producto_memoria = []

const guardar = (producto) => {
    if (producto.nombre === "" || producto.descripcion === "" || producto.codigo === "" || producto.foto === "" || producto.precio === "" || producto.stock === "") return false;
    if (producto.nombre === undefined || producto.descripcion === undefined || producto.codigo === undefined || producto.foto === undefined || producto.precio === undefined || producto.stock === undefined) return false;
    if (producto.precio < 0 || producto.stock < 0) return false;
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

const actualizarPorId = (id, data) => {
    try {
        if (data.nombre === "" || data.descripcion === "" || data.codigo === "" || data.foto === "" || data.precio === "" || data.stock === "") return false;
        if (data.nombre === undefined || data.descripcion === undefined || data.codigo === undefined || data.foto === undefined || data.precio === undefined || data.stock === undefined) return false;
        if (data.precio < 0 || data.stock < 0) return false;
        producto_memoria = producto_memoria.map((producto) => {
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
        return true;
    } catch (err) {
        console.log('Ocurrio un error inesperado', err);
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
