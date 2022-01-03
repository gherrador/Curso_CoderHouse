let { messageContoller } = require("../../Controllers")
const { logger, loggererror } = require("../../Services/logger")

module.exports = (io)=>{ 
    io.on('connection',async(socket) => {      
        logger.info('Cliente conectado');
        socket.emit('mensajes', await messageContoller.getMessage())
        socket.on('nuevo_mensaje', async(mensaje) => {                             
            await messageContoller.saveMessage(mensaje)
            io.sockets.emit('mensajes', await messageContoller.getMessage())
        })
    })
        
}