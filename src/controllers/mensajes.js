const { promises: { readFile, writeFile, unlink } } = require('fs');

class chat {
    constructor() {}

    leer = async() => {
        try {
            const contenido = await readFile('./mensajes/mensajes.txt', 'utf-8')
            return (JSON.parse(contenido))
        } catch (err) {
            return [];
        }
    }
    borrar = async() => {
        try {
            await unlink('./mensajes/mensajes.txt')
        } catch (err) {
            console.log('imposible borrar')
        }
    }

    guardar = async(autor, texto) => {
        try {
            let mensaje = await this.leer()
            const nuevoMensaje = {
                autor,
                texto,
                id: mensaje.length + 1
            };
            nuevoMensaje.date = new Date().toLocaleString();
            mensaje.push(nuevoMensaje);
            await writeFile('./mensajes/mensajes.txt', JSON.stringify(mensaje, null, '\t'));
            return `Se ha agregado el autor ${autor}`;
        } catch (err) {
            console.log('Algo salio mal... fue imposible guardar el mensaje');
        }
    }
}

module.exports = chat;