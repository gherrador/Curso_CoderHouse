class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota = (mascota) => {
        this.mascotas.push(mascota);
    }

    getMascotas = () => {
        return this.mascotas.length;
    }

    addBook = (book, autor) => {
        const libro = { nombre: book, autor: autor }
        this.libros.push(libro);
    }

    getBooks = () => {
        const nombre_libro = []
        this.libros.forEach((libro) => {
            nombre_libro.push(libro.nombre)
        });
        return nombre_libro;
    }
}

const Gustavo = new Usuario("Gustavo", "Herrador", [], []);
console.log(Gustavo.getFullName())
Gustavo.addMascota("Gato")
console.log(Gustavo.getMascotas())
Gustavo.addBook('La llamada de Chtullu', 'Lovecraft')
Gustavo.addBook('En las montañas de la locura ', 'Lovecraft ')
Gustavo.addBook('Hola que tal', 'hola')
console.log(Gustavo.getBooks())