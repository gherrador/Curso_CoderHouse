function Usuario(nombre, apellido, libros, mascotas) {
    this.nombre = nombre
    this.apellido = apellido
    this.libros = libros
    this.mascotas = mascotas
}

Usuario.prototype.getFullName = function() {
    return `${this.nombre} ${this.apellido}`;
}

Usuario.prototype.addMascota = function(mascota) {
    this.mascotas.push(mascota);

}

Usuario.prototype.getMascotas = function() {
    return this.mascotas.length;
}

Usuario.prototype.addBook = function(book, autor) {
    const libro = {
        nombre: book,
        autor: autor
    }
    this.libros.push(libro);
}

Usuario.prototype.getBooks = function() {
    const nombre_libros = []
    this.libros.forEach(function(libro) {
        nombre_libros.push(libro.nombre)
    });
    return nombre_libros;
}

//Ejemplo
const Gustavo = new Usuario("Gustavo", "Herrador", [], []);
console.log(Gustavo.getFullName())
Gustavo.addMascota("Perro")
console.log(Gustavo.getMascotas())
Gustavo.addBook('La llamada de Chtullu', 'Lovecraft')
console.log(Gustavo.getBooks())