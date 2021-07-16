"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resta = /** @class */ (function () {
    function Resta(a, b, operacion) {
        this.a = a;
        this.b = b;
        this.operacion = operacion;
    }
    Resta.prototype.resultado_resta = function () {
        if (this.operacion == 'resta')
            return this.a - this.b;
    };
    return Resta;
}());
exports.default = Resta;
