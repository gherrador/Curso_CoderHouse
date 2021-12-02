const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const routerProductos = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { Productos } = require('../models/esquemaProducto');
const ProductoDB = require('../controllers/ProductoDB')
const productodb = new ProductoDB;


routerProductos.delete("/borrar/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await productodb.borrarPorId(id);
        let productos = await productodb.listar();
        res.status(201).json(productos);
    } catch {
        res.status(400).send("imposible borrar producto")
    }
});

routerProductos.put("/actualiza/:id", async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    if (await productodb.actualizar(id, data)) {
        res.status(201).json(data);
    }
    res.status(400).send();
});


const schema = buildSchema(`
    type Query {       
        productos: [Producto]
        productosId(_id: String!): Producto     
    },
    type Mutation {        
        agregarProducto(title: String!, price: String!, thumbnail: String!): Producto
    },
    type Producto {
        _id: String
        title: String
        price: String
        thumbnail: String
    }    
`);


// console.log(productsData);
//funcion para GET
const getProductos = () => {
    let productos = Productos.find({}).lean()
    return productos
}

const getProductoById = async (args) => {
    const productoid = args._id
    let producto_id = await productodb.listarPorId(productoid)
    return producto_id
}

//funcion para POST 
const agregarProducto = async ({ title, price, thumbnail }) => {
    try {
        const data = {
            title: title,
            price: price,
            thumbnail: thumbnail
        }
        await productodb.guardar(data)
        return data
    } catch {
        return 'error al guardar producto'
    }
}

// Root resolver
var root = {
    agregarProducto: agregarProducto,
    productos: getProductos,
    productosId: getProductoById,
};

routerProductos.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));


module.exports = routerProductos