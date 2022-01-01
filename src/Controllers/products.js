const getProductsController = (service) => async (req, res, next) => {try {
    let productos = await service.getProductsServices()                  
    res.json(productos)
} catch {
    res.render('error', {
        active: "error",            
        user: req.user
    });
}
}

const ProductByIdController = (service) => async(req, res) => {
    try {
        const { id } = req.params;        
        const productById = await service.getProductByIdServices(id)        
        res.json(productById)              
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
};

const saveProductController = (service) => async(req, res) => {
    try {
        const data = req.body;
        const productos = await service.getProductsServices()
        service.saveProductsServices(data)        
        if (productos.length !== "0") { return res.redirect('/') };
    } catch (err) {
        res.status(404).send({ error: err.message })
    }        
};

const updateController = (service) => async(req, res) => {
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
};

const updateByIdController = (service) => async(req, res) => {
    const { id } = req.params    
    const productoactualizar = await service.getProductByIdServices(id)
    res.render('actualizar-producto', {
        active: "actualizar-producto",
        productos: productoactualizar
    })
}

const deleteByIdController = (service) => async(req, res) => {
    try {
        const { id } = req.params;
        await service.deleteByIdService(id);
        res.redirect("/productos/listar")
    } catch {
        res.render('error', {
            active: "error",            
            user: req.user
        });
    }
};




module.exports = (services)=> ({
    listProducts: getProductsController(services),
    listById: ProductByIdController(services),
    saveProducts: saveProductController(services),
    updateProducts: updateController(services),
    updateById: updateByIdController(services),
    deleteById: deleteByIdController(services)
})

