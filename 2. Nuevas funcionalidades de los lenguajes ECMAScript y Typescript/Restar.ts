export default class Resta {
    private a: number
    private b: number
    private operacion: String
        
    constructor(a: number, b: number, operacion: String) {
        this.a = a
        this.b = b
        this.operacion = operacion
    }
     
    resultado_resta(): number | undefined {
        if (this.operacion == 'resta')
          return this.a - this.b;
      }
}
