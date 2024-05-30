// Función `interactuarCadenas`

function interactuarCadenas(cadena1, cadena2) {
  // Tu código aquí
  let nuevaCadena = "";
  for (let i = 0; i < cadena1.length; i++) {
    if (cadena1[i] === cadena2[i]) {
      nuevaCadena = nuevaCadena + cadena1[i];
    } else {
      nuevaCadena = nuevaCadena + 0;
    }
  }
  return nuevaCadena;
}

// Función `generarApodo`

function generarApodo(nombre) {
  // Tu código aquí

  const longitudNombre = nombre.length;
  const vocales = "aeiou";

  if (longitudNombre >= 4) {
    if (vocales.includes(nombre[2])) {
      return nombre.substr(0, 4);
    } else {
      return nombre.substr(0, 3);
    }
  } else {
    throw new Error("Nombre muy corto");
  }
}

// Función `obtenerMarcador`

function obtenerMarcador(texto) {
  // Tu código aquí

  const palabrasANumeros = {
    cero: 0,
    uno: 1,
    dos: 2,
    tres: 3,
    cuatro: 4,
    cinco: 5,
    seis: 6,
    siete: 7,
    ocho: 8,
    nueve: 9,
  };

  const numPalabras = texto.toLowerCase().split(" ");
  const numeros = [];

  for (const palabra of numPalabras) {
    if (palabrasANumeros.hasOwnProperty(palabra)) {
      numeros.push(palabrasANumeros[palabra]);
      if (numeros.length === 2) break;
    }
  }

  while (numeros.length < 2) {
    numeros.push(0);
  }

  return numeros;
}

// Clase `Barco`

class Barco {
  // Tu código aquí
  constructor(calado, tripulación) {
    this.calado = calado;
    this.tripulación = tripulación;
  }

  valeLaPena() {
    const caladoAjustado = this.calado - this.tripulación * 1.5;
    return caladoAjustado > 20 ? true : false;
  }
}
