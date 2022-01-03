
const guardar = (chatRepository) => async(mensaje) => {
        try {           
            await chatRepository.saveMessage(mensaje)
            return true               
        } catch (err){
            console.log(err)
        }
    }


const leer = (chatRepository) => async() => {
        try {
            const mensajesdata = await chatRepository.getAllMessage()
            return mensajesdata
        } catch {
            return "imposible leer data"
        }
    }


    module.exports = (chatRepository) =>({
        getMessage: leer(chatRepository),
        saveMessage: guardar(chatRepository),        
    })