const { promises: { readFile, writeFile, unlink } } = require('fs');

class Archivo {
    constructor() {}

    async guardar(producto) {
        let bb_dd = await readFile('./productos.txt', 'utf-8')
        try {
            let productos = []
            if (bb_dd == 0) {
                await writeFile('./productos.txt', JSON.stringify(producto, null, '\t'))
            } else if (await readFile('./productos.txt', 'utf-8')) {
                productos = JSON.parse(await readFile('./productos.txt', 'utf-8'))
            }
            const productoAguardar = {...producto, id: productos.length + 1 }
            productos.push(productoAguardar);
            await writeFile('./productos.txt', JSON.stringify(productos, null, '\t'))
            console.log('guardado')

        } catch (err) {
            console.log('error al guardar')
        }
    }

    leer = async() => {
        try {
            const contenido = await readFile('./productos.txt', 'utf-8')
            console.log(JSON.parse(contenido))
        } catch (err) {
            console.log([])
        }
    }

    borrar = async() => {
        try {
            await unlink('./productos.txt')
        } catch (err) {
            console.log('imposible borrar')
        }
    }
}

let articulo = new Archivo()
const run = async function() {
    await articulo.guardar({
        title: 'Lapicera',
        price: 100,
        thumbnail: 'https://www.bomberomania.com.ar/wp-content/uploads/LAPICERA-AZUL-EMERGENCIA-M%C3%89DICA-2.jpg'
    })
    await articulo.guardar({
        title: 'Cartuchera',
        price: 150,
        thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/71yD4CfwDPL._AC_SY450_.jpg'
    })
    await articulo.guardar({
        title: 'Lapiz',
        price: 50,
        thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/51syRr6MYjL._AC_SY355_.jpg'
    })

    await articulo.leer()
        //await articulo.borrar()
}

run().catch(error => console.log(error))