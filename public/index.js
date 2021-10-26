const socket = io()

socket.on('mensajes', normalizedData => {
    const autor = new normalizr.schema.Entity("autor");
    const mensaje = new normalizr.schema.Entity('mensaje', { autor: autor }, { idAttribute: (value) => (value._id ? `${value._id.toString()}` : value.id) }, {
        autor: autor,
    });
    const mensajes = new normalizr.schema.Entity('mensajes', {
        mensajes: [mensaje]
    })
    const denormalizedData = normalizr.denormalize(normalizedData.result, mensajes, normalizedData.entities)
    const porcentajenormalizado = JSON.stringify(normalizedData).length
    const porcentajedenormalizado = JSON.stringify(denormalizedData).length
    const porcentaje = Math.round((porcentajedenormalizado / porcentajenormalizado) * 100)
    render(denormalizedData, porcentaje)
});

nuevomensaje = () => {
    const mensaje = {
        autor: {
            id: document.getElementById('email_usuario').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        texto: document.getElementById('texto').value,
    };
    socket.emit('nuevo_mensaje', mensaje);
    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()
    return false;
}

render = (data, porcentaje) => {
    const html = data.mensajes.map((elem) => {
        return (`<div style="color:rgb(128,64,0);">        
        <strong style="color:rgb(0,0,255);">${elem.autor.id}</strong>
        [(${elem.date})]:
        <em style="color:rgb(0,143,57);">${elem.texto.texto}</em> 
        <img class="card-img-top" src="${elem.autor.avatar}" alt="Card image cap">
        </div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html
    document.getElementById('porcentaje').innerHTML = (`<div><H1 style="color:rgb(0,0,255);"> El porcentaje de compresion es ${porcentaje}%</H1></div>`)
}