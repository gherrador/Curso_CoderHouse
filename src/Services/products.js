const getAllProducts = (db) => async() => {
    try {
        const productList =  await db.find({})                 
        return productList 
    } catch {
        return false
    }
}
const saveProduct = (db) => async (data) => {
    try {
        const producto = {
            timestamp: Date.now(),
            title: data.title,
            price: data.price,
            thumbnail: data.thumbnail
        }

        const productocreado = await db.create(producto)
        return productocreado
    } catch {
        return false
    }
}
const getProductById = (db) => async (id) => {    
    try {
        const productId = await db.findById(id)
        return productId
    } catch {
        return false
    }
}

const updateByid = (db) => async (data) => {
    try {
        const id = data.id
        const nuevotitle = data.title;
        const nuevoprice = data.price;
        const nuevothumbnail = data.thumbnail;       
        await db.updateOne({ _id: id }, {
            $set: {
                title: nuevotitle,
                price: nuevoprice,
                thumbnail: nuevothumbnail
            }
        })
        return true;
    } catch {
        loggererror.error('Mensaje error ----------------->No se pudo actualizar el producto')
    }
}

const  deleteById = (db) => async (id) => {
    try {
        await db.deleteOne({ _id: id })
        return true
    } catch {
        loggererror.error('Mensaje error ----------------->No se pudo borrar el producto')
    }
}


module.exports = (db) =>({
    getProductsServices: getAllProducts(db),
    saveProductsServices: saveProduct(db),
    getProductByIdServices: getProductById(db),
    updateByIdService: updateByid(db),
    deleteByIdService: deleteById(db)
})