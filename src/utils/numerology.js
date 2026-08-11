const TABLA_LETRAS = {
    A: 1, J: 1, S: 1,
    B: 2, K: 2, T: 2,
    C: 3, L: 3, U: 3,
    D: 4, M: 4, V: 4,
    E: 5, N: 5, W: 5,
    F: 6, O: 6, X: 6,
    G: 7, P: 7, Y: 7,
    H: 8, Q: 8, Z: 8,
    I: 9, R: 9
};

const VOCALES = ["A", "E", "I", "O", "U"];

const NUMEROS_MAESTROS = [11, 22, 33];

function reducirNumero(numero, respetarMaestros = true) {
    while (numero > 9) {
        if (
            respetarMaestros &&
            NUMEROS_MAESTROS.includes(numero)
        ) {
            return numero;
        }

        numero = numero
            .toString()
            .split("")
            .reduce((total, digito) => total + Number(digito), 0);
    }

    return numero;
}

function limpiarNombre(nombreCompleto) {
    return nombreCompleto
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function numeroVida(fechaNacimiento) {
    const fecha = new Date(fechaNacimiento);

    if (isNaN(fecha.getTime())) {
        throw new Error("Fecha de nacimiento inválida");
    }

    const fechaTexto = fecha.toISOString().split("T")[0];

    const suma = fechaTexto
        .replace(/-/g, "")
        .split("")
        .reduce(
            (total, digito) => total + Number(digito),
            0
        );

    return reducirNumero(suma);
}

function numeroExpresion(nombreCompleto) {
    const nombre = limpiarNombre(nombreCompleto);

    const suma = nombre
        .split("")
        .filter((caracter) => TABLA_LETRAS[caracter])
        .reduce(
            (total, caracter) => total + TABLA_LETRAS[caracter],
            0
        );

    return reducirNumero(suma);
}

function numeroAlma(nombreCompleto) {
    const nombre = limpiarNombre(nombreCompleto);

    const suma = nombre
        .split("")
        .filter((caracter) => VOCALES.includes(caracter))
        .reduce(
            (total, caracter) => total + TABLA_LETRAS[caracter],
            0
        );

    return reducirNumero(suma);
}

module.exports = {
    reducirNumero,
    numeroVida,
    numeroExpresion,
    numeroAlma
};