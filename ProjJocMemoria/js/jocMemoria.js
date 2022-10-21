let numFilas = prompt("Introduzca el número de filas:");
let numColumnas = prompt("Introduzca el número de columnas:");


//Asegurar que el tablero cuadre para poder hacer parejas siempre.
while ((numFilas * numColumnas) % 2 != 0) {
    alert("No has introducido un número par de filas y columnas");
    numFilas = prompt("Introduzca de nuevo el número de filas:");
    numColumnas = prompt("Introduzca de nuevo el número de columnas:");
}

class Tablero {

    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;

        this.crearTablero();
    }

    crearTablero() {

        this.arrayTablero = [];

        if ((this.filas + this.columnas) % 2 == 0) {

            for (let fila = 0; fila < this.filas; fila++) {
                this.arrayTablero[fila] = [];

                for (let columna = 0; columna < this.columnas; columna++) {
                    this.arrayTablero[fila][columna] = '';
                }
            }
        }
    }

    pintarTablero() {
        document.write('<table>');
        for (let i = 0; i < this.filas; i++) {
            document.write('<tr>');

            for (let j = 0; j < this.columnas; j++) {
                if (this.arrayTablero[i][j] != 0) {
                    document.write('<td>' + this.arrayTablero[i][j] + '</td>');
                } else {
                    document.write('<td></td>');
                }
            }
            document.write('</tr>');
        }
        document.write('</table>');
    }
}

class Memoria extends Tablero {

    constructor(filas, columnas) {
        super(filas, columnas);
        this.colocarElementos();
    }

    colocarElementos() {
        elementos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        casillasTablero = this.filas * this.columnas;
        contadorCasillas = 0;

        while (contadorCasillas < casillasTablero) {
            posFila = Math.floor(Math.random() * this.filas);
            posColumna = Math.floor(Math.random() * this.columnas);

            for(i = 0; i < count(elementos); i++){

                if (this.arrayTablero[posFila][posColumna] == '') {
                    this.arrayTablero[posFila][posColumna] = elementos[i];
                    contadorCasillas++;
                }

            }


        }
    }
}

let memoria1 = new Memoria(numFilas, numColumnas);
memoria1.pintarTablero();
console.log(memoria1.arrayTablero);