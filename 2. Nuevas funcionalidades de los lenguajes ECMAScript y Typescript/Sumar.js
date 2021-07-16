"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Suma = /** @class */ (function () {
    function Suma(a, b, operacion) {
        this.a = a;
        this.b = b;
        this.operacion = operacion;
    }
    Suma.prototype.resultado_suma = function () {
        if (this.operacion == 'suma')
            return this.a + this.b;
    };
    return Suma;
}());
exports.default = Suma;
