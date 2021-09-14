function suma(a, b) {
    if (typeof a && typeof b === 'number') {
        return a + b;
    }
}

function resta(a, b) {
    if (typeof a && typeof b === 'number') {
        return a - b;
    }
}

function multiplicar(a, b) {
    if (typeof a && typeof b === 'number') {
        return a * b;
    }
}


function dividir(a, b) {
    if (typeof a && typeof b === 'number') {
        return a / b;
    }
}


module.exports = { suma, resta, multiplicar, dividir }