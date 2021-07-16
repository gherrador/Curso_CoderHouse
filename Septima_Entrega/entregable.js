import express from 'express'
import fs from 'fs'
const app = express()

const puerto = 8080
let contador_items = 0
let contador_itemrandom = 0
const server = app.listen(puerto, () => {
    console.log(`servidor http escuchando en http://localhost:${puerto}`)

})
server.on('error', error => {
    console.log('Error en servidor:', error);
})
app.get('/items', (req, res) => {
    contador_items++
    let productos = JSON.parse(fs.readFileSync('productos.txt', 'utf-8'));
    let respuesta = {
        items: productos,
        cantidad: JSON.parse(fs.readFileSync('productos.txt', 'utf-8')).length
    }
    res.send(respuesta);
});

app.get('/item-random', (req, res) => {
    contador_itemrandom++
    let items = JSON.parse(fs.readFileSync('productos.txt', 'utf-8'));
    let itemrandom = items[Math.floor(Math.random() * items.length)];
    res.send({ item: itemrandom })
})
app.get('/visitas', (req, res) => {
    res.json({ visitas: { items: contador_items, item: contador_itemrandom } })
})