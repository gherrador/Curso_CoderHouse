export default class Suma {
    private a: number
    private b: number
    private operacion: String
        
    constructor(a: number, b: number, operacion: String) {
        this.a = a
        this.b = b
        this.operacion = operacion
    }
     
    resultado_suma(): number | undefined {
        if (this.operacion == 'suma')
          return this.a + this.b;
      }
}



