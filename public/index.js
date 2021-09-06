const socket = io()

function datosformulario() {
    const producto = {
        title: document.getElementById('titulo').value,
        price: document.getElementById('precio').value,
        thumbnail: document.getElementById('foto').value
    };
    socket.emit('listado', producto);
    return false;
}

const cabecera = `
<table class="table">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Titulo</th>
        <th scope="col">Precio</th>
        <th scope="col">Foto</th>
        </tr>
    </thead>
    <tbody>`
const tabla = `
        <tr>
            <th scope="row">{{id}}</th>
            <td>{{title}}</td>
            <td>{{price}}</td>
            <td>
                <img class="img-thumbnail" src={{{thumbnail}}} alt="" />
            </td>
        </tr>`
const fin = `
    </tbody>
</table>`
const miTemplate = Handlebars.compile(tabla);

socket.on('lista', producto => {
    if (producto.length > 0) {
        const productosindex = producto.map(({ title, price, thumbnail }) => {
            return miTemplate({ title, price, thumbnail });
        });
        const lista = cabecera +
            `<ul>${productosindex.join('')}</ul>` +
            fin;
        document.getElementById('lista').innerHTML = lista;
    } else {
        document.getElementById('lista').innerHTML = '<p>No hay productos para mostrar</p>';
    }
})


socket.on('mensajes', producto => {
    render(producto);
});

nuevomensaje = () => {
    const mensaje = {
        autor: document.getElementById('email_usuario').value,
        texto: document.getElementById('texto').value
    };
    socket.emit('nuevo_mensaje', mensaje);
    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()
    return false;
}

render = (producto) => {
    const html = producto.map((elem, index) => {
        return (`<div style="color:rgb(141,73,37);">
                <b style="color:rgb(0,0,255);">${elem.autor}</b>
                [(${elem.date})]:
                <i style="color:rgb(6,227,22);">${elem.texto}</i> </div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}