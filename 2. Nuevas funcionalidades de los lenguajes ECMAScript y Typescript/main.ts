const operacion = async (a: number, b: number, operacion: string) => {
    if (operacion == 'suma'){
        const modulo_suma = await import("./Sumar");
        const suma = new modulo_suma.default (a, b, operacion)
        return suma.resultado_suma()
    }else if (operacion == "resta"){
        const modulo_resta = await import("./Restar");
        const resta = new modulo_resta.default (a, b, operacion)
        return resta.resultado_resta()
    } 
};
const operaciones = async () => {
    console.log (await operacion(12, 4, 'suma'));
    console.log (await operacion(12, 4, 'resta'));
};

operaciones();