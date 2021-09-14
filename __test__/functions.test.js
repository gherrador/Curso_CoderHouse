const path = require('path')
const { suma, resta, multiplicar, dividir } = require(path.join(__dirname, '../src/functions'));


describe("test de mis funciones", () => {
    test('Should return 3', () => {
        expect(suma(1, 2)).toBe(3);
    })

    test('Shoudl return 8', () => {
        const a = 3
        const b = 5
        const c = 8
        expect(suma(a, b)).toBe(c);
    })
    test('Shoul return  3', () => {
        const a = -2
        const b = 5
        const c = 3
        expect(suma(a, b)).toBe(c);
    })
    test('Shoul return  -3', () => {
        const a = 2
        const b = 5
        const c = -3
        expect(resta(a, b)).toBe(c);
    })
    test('Shoul return  3', () => {
        expect(resta(8, 5)).toBe(3);
    })
    test('Shoul return  10', () => {
        const a = 2
        const b = 5
        const c = 10
        expect(multiplicar(a, b)).toBe(c);
    })
    test('Shoul return  15', () => {
        expect(multiplicar(3, 5)).toBe(15);
    })
    test('Shoul return  2', () => {
        expect(dividir(200, 100)).toBe(2);
    })
    test('Shoul return  3', () => {
        const a = 15
        const b = 5
        const c = 3
        expect(dividir(a, b)).toBe(c);
    })

})