const productService = require("../Services/product")

const listProductController = async(req, res) => {
    try {
        let productos = await productService.list()
        res.render('lista', {
            active: "lista",
            productos: productos,
            user: req.user
        });        
    } catch {
        return res.status(404).send("error al listar")
    }
}

const saveProductController = async(req, res) => {
    try {
        const data = req.body;
        const productos = await productService.list()
        productService.save(data)
        if (productos.length !== "0") { return res.redirect('/') };
    } catch {
        res.render('error', {
            active: "error",            
            user: req.user
        });
    }        
};

const ProductByIdController = (productService) => async(req, res) => {
    try {
        const { id } = req.query;
        const productById = await productService.getProductById(id)
        res.render('filtro', {
            active: "filtro",
            productos: productById
        });
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
};

const updateController = async(req, res) => {
    try {
        const data = req.body        
        await productService.updateByid(data)
        res.redirect("/productos/listar")

    } catch {
        res.render('error', {
            active: "error",            
            user: req.user
        });
    }
};

const updateByIdController = async(req, res) => {
    const { id } = req.params    
    const productoactualizar = await productService.listById(id)
    res.render('actualizar-producto', {
        active: "actualizar-producto",
        productos: productoactualizar
    })
}

const deleteByIdController = async(req, res) => {
    try {
        const { id } = req.params;
        await productService.deleteById(id);
        res.redirect("/productos/listar")
    } catch {
        res.render('error', {
            active: "error",            
            user: req.user
        });
    }
};


module.exports = {
    listProduct: listProductController,
    saveProduct: saveProductController,   
    update: updateController,
    ProductId: ProductByIdController,
    updateById: updateByIdController,
    deleteById: deleteByIdController,
  };