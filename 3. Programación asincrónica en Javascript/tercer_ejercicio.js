const { promisify } = require('util');
const timeout = promisify(setTimeout)

const mostrarPalabras = async(texto, tiempo, callback) => {
    const contador_palabras = texto.split(' ').length;
    const textoaarray = texto.split(' ');
    for (const palabaras of textoaarray) {
        await timeout(tiempo);
        console.log(palabaras);
    }
    setTimeout(() => {
        callback(contador_palabras)
    }, tiempo)
}

let texto1 = 'Muchos de los que viven merecen morir';
let texto2 = 'y algunos de los que mueren merecen la vida';
let texto3 = '¿Puedes devolver la vida?';
const tiempo = 800;

mostrarPalabras(texto1, tiempo, (contadorPalabras) => {
    mostrarPalabras(texto2, tiempo, (contadorPalabras2) => {
        mostrarPalabras(texto3, tiempo, (contadorPalabras3) => {
            console.log('Proceso completo, cantidad de palabras:', contadorPalabras + contadorPalabras2 + contadorPalabras3);
        });
    });
});