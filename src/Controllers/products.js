const getProductsController = (productService) => async (req, res) => {
    try {
        let productos = await productService.getAllProducts()                 
        res.status(404).json(productos)
    } catch(err) {
        res.status(404).send({ error: err.message })        
    }
}

const saveProductController = (productService) => async(req, res) => {
    try {
        const data = req.body;              
        await productService.saveProducts(data)        
        res.status(404).json(data)
    } catch (err) {
        res.status(404).send({ error: err.message })
    }        
};
const ProductByIdController = (productService) => async(req, res) => {
    try {
        const { id } = req.params;        
        const productById = await productService.getProductById(id)        
        res.json(productById)              
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
};


/*const updateController = (service) => async(req, res) => {
    try {
        const data = req.body        
        await service.updateByIdService(data)
        res.redirect("/productos/listar")
    } catch {
        res.render('error', {
            active: "error",            
            user: req.user
        });
    }
};*/

const updateByIdController = (productService) => async(req, res) => {
    try{
        const { id } = req.params
        const data = req.body
        await productService.updateProductById(id, data)
        res.status(200).json(data)
    }catch (err){
        res.status(404).send({ error: err.message })
    }
}

const deleteByIdController = (productService) => async(req, res) => {
    try {
        const { id } = req.params;
        await productService.deleteProductById(id);
        res.status(200).json("producto borrado")
    } catch (err){
        res.status(404).send({ error: err.message })
    }
};




module.exports = (services)=> ({
    listProducts: getProductsController(services),
    listById: ProductByIdController(services),
    saveProducts: saveProductController(services),    
    updateById: updateByIdController(services),
    deleteById: deleteByIdController(services)
})

