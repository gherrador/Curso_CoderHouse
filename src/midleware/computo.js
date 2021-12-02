process.on("message", cant => {
    const cantidad = cant ? cant : 100000000;
    console.log("cantidad la cantidad de numeros random a generar es:" + cantidad);
    const repeated = {};
    for (let i = 0; i < cantidad; i++) {
        const aleatorio = Math.floor((1 + Math.random() * 999));
        if (repeated[aleatorio]) {
            repeated[aleatorio]++
        } else {
            repeated[aleatorio] = 1
        }
    }
    process.send(repeated)
})