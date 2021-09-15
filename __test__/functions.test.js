const path = require('path')
const { suma, resta, multiplicar, dividir } = require(path.join(__dirname, '../src/functions'));


describe("test de mis funciones", () => {
    test('Should return 3', () => {
        expect(suma(1, 2)).toBe(3);
    })

    test('Shoudl return 8', () => {
        expect(suma(3, 5)).toBe(8);
    })
    test('Shoul return  3', () => {
        expect(suma(-2, 5)).toBe(3);
    })
    test('Shoul return  -3', () => {
        expect(resta(5, 8)).toBe(-3);
    })
    test('Shoul return  3', () => {
        expect(resta(8, 5)).toBe(3);
    })
    test('Shoul return  10', () => {
        expect(multiplicar(2, 5)).toBe(10);
    })
    test('Shoul return  15', () => {
        expect(multiplicar(3, 5)).toBe(15);
    })
    test('Shoul return  2', () => {
        expect(dividir(200, 100)).toBe(2);
    })
    test('Shoul return  3', () => {
        expect(dividir(15, 5)).toBe(3);
    })

})
