const productService = ({productsDao}) =>({
    getAllProducts(){      
        return productsDao.getProducts();
    },
    saveProducts(data){
        return productsDao.saveProduct(data)
    },
    getProductById(id){
        return productsDao.getProductById(id)
    },
    updateProductById(id, data){
        return productsDao.updateById(id, data)
    },
    deleteProductById(id){
        return productsDao.deleteById(id)
    }
})


module.exports = productService