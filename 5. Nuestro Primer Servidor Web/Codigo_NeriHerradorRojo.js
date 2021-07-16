let producto = {
    id: Math.floor(Math.random() * (10 - 1)) + 1,
    title: `Producto ${Math.floor(Math.random() * (10 - 1)) + 1}`,
    price: Math.floor(Math.random() * (9999.99 - 0.00)) + 0.00,
    thumbnail: `Foto ${Math.floor(Math.random() * (10 - 1)) + 1}`
}
console.log(producto)