const { Mensajes } = require("../../models/chatDB")
const ChatRepository = require("./chatRepository")

module.exports = {
    chatRepository: ChatRepository(Mensajes)
}