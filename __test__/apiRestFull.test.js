const request = require('supertest')
const moongose = require('mongoose');
const { app, server } = require('../server')

const api = request(app)

jest.setTimeout(40000);
// ------ Producto para test POST ------ //
const id = "61cba9f7f9c374295068c166"
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
       test('deberia retornar un status 200', () => {          
        api
        .get('/productos/listar')           
        .expect('Content-Type', /json/)            
        .end((err, res) => {                         
            if (err) throw err;                                            
            expect(res.body).not.toBeNull();               
            expect(res.body).not.toBeUndefined();                
        })
    })    
});

describe('POST / debe incorporar un nuevo producto', () => {
    test('deberia retornar un status 200', (done) => {
        request(app)
            .post('/productos/')
            .send(producto)
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


afterAll( () => {  
    moongose.connection.close()
    server.close()
  });