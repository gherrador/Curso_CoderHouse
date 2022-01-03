const socket = io()
const popup = document.querySelector('.chat-popup')
const chatBtn = document.querySelector('.chat-btn')
const emojiBtn = document.querySelector('#emoji-btn');
const chatArea = document.querySelector('.chat-area')
const submitBtn = document.querySelector('.submit_chat')
const inputElm = document.querySelector('.input_chat')
const picker = new EmojiButton();
const input = document.getElementById("myinput")
const texto = document.querySelector('.input_chat').value
const minimizar = document.querySelector('.badge')



//Seleccionar Emoji

window.addEventListener('DOMContentLoaded', () => {
    picker.on('emoji', emoji => {
        document.querySelector('.input_chat').value += emoji;
    });
    emojiBtn.addEventListener('click', () => {
        picker.togglePicker(emojiBtn);
    });    
})

// chat button toggler

chatBtn.addEventListener('click', () =>{
    popup.classList.toggle('show');  
})

minimizar.addEventListener('click', () =>{
    popup.classList.toggle('show');  
})

submitBtn.addEventListener('click', () =>{  
    if((document.querySelector('.input_chat').value).length == 0){
        return false
    }      
    const mensaje = {
        autor: {        
        nombre: document.querySelector('.chat_nombre').value,
        username: document.querySelector('.chat_username').value,
        foto: document.querySelector('.chat_foto').value, 
    },          
        texto: document.querySelector('.input_chat').value,
        date: new Date().toLocaleDateString()  
    };
    socket.emit('nuevo_mensaje', mensaje);
    document.querySelector('.input_chat').value = ''
    document.querySelector('.input_chat').focus()  
    return false;    
})


socket.on('mensajes', async(data) => {         
    chatArea.innerHTML = ""
    const html = data.map((elem) => {
        return (`<div class="out-msg"><img class="avatar_user" src="${elem.foto}"><span class="text_msg"> ${elem.texto}</span> </div>`)
    }).join(" ");
    chatArea.insertAdjacentHTML("beforeend", html);
    $("#chat").animate({ scrollTop: $('#chat').prop("scrollHeight")}, 1000);
});


/*input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {  
        if((document.querySelector('.input_chat').value).length == 0){
            return false
        }
        const mensaje = {
            autor: {        
            nombre: document.querySelector('.chat_nombre').value,
            username: document.querySelector('.chat_username').value,
            foto: document.querySelector('.chat_foto').value, 
        },          
            texto: document.querySelector('.input_chat').value,
            date: new Date().toLocaleDateString()  
        };
        socket.emit('nuevo_mensaje', mensaje);
        document.querySelector('.input_chat').value = ''
        document.querySelector('.input_chat').focus()  
        return false;    
    }
})*/



 