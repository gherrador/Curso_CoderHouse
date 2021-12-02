const request = require('supertest')
const mongoose = require('mongoose');
const { app, server } = require('../server')


// ------ Producto para test POST ------ //
const id = "61a8ec1cb4303007984b1e3a"
const producto = {
    "title": 'Arroz Blanco', 
    "price": '21100',
    "thumbnail": 'https://cdn2.iconfinder.com/data/icons/international-food/64/fried_rice-128.png'
};

 // ---- Producto para test PUT ---- //

const producto_actualizar = {     
    "title": "Lapicera",    
    "price": '180',
    "thumbnail": "https://libreriaelarco.com.ar/wp-content/uploads/2020/06/WhatsApp-Image-2020-06-16-at-23.56.16.jpeg",
}


describe('GET / deberia retonar uno o varios productos', () => {
    it('deberia retornar un status 200', (done) => {
        request(app)
            .get('/productos/lista')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        done()
    })
    it('deberia retonar un producto buscado por un ID', (done) => {
        request(app)
            .get(`productos/listar/${id}`)           
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        done()
    });    
});
describe('POST / debe incorporar un nuevo producto', () => {
    it('deberia retornar un status 200', (done) => {
        request(app)
            .post('/productos/')
            .send(producto)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        done()
    })    
});

describe('PUT / debe actualizar un nuevo producto', () => {
    it('deberia retornar un status 200', (done) => {
        request(app)
            .put(`productos/actualizar/${id}`)
            .send(producto_actualizar)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        done()
    })    
});

describe('DELETE / debe eliminar un producto', () => {
    it('deberia retornar un status 200', (done) => {
        request(app)
            .delete(`productos/borrar/${id}`)            
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        done()
    })    
});

after(() => {
    mongoose.connection.close()
    server.close()
    console.log("------------FIN DEL TEST ------------")
})


