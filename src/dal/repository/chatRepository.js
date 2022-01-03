const guardar = (Mensajes) => async(mensaje) => {
        try {
            const mensajeguardado = await Mensajes.create(mensaje)
            return mensajeguardado
        } catch {
            return "imposible guardar mensajes"
        }
    }


const leer = (Mensajes) => async() => {
        try {
            const messageData = await Mensajes.find({}).lean()
            return messageData
        } catch {
            return "imposible leer data"
        }
    }


    module.exports = (Mensajes) =>({
        saveMessage: guardar(Mensajes),
        getAllMessage: leer(Mensajes),
     
})