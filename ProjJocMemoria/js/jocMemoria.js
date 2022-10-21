let numFilas = prompt("Introduzca el número de filas:");
let numColumnas = prompt("Introduzca el número de columnas:");

<<<<<<< HEAD
//Asegurar que el tablero cuadre para poder hacer parejas siempre.
while ((numFilas * numColumnas) % 2 != 0) {
    alert("No has introducido un número par de filas y columnas");
    numFilas = prompt("Introduzca de nuevo el número de filas:");
    numColumnas = prompt("Introduzca de nuevo el número de columnas:");
=======
while ((numFilas * numColumnas)%2 != 0){
    alert("No has introducido un número par de filas y columnas");
    numFilas = prompt("Introduzca el número de filas:");
    numColumnas = prompt("Introduzca el número de columnas:");
>>>>>>> 926be054eadf5250a51db482b9fb22b21a1688df
}

class Tablero {

    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;

        this.crearTablero();
    }

    crearTablero() {
<<<<<<< HEAD

        this.arrayTablero = [];

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = [];

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
=======

        this.arrayTablero = [];

        if((this.filas + this.columnas)%2 == 0){

            for (let fila = 0; fila < this.filas; fila++) {
                this.arrayTablero[fila] = [];

                for (let columna = 0; columna < this.columnas; columna++) {
                    this.arrayTablero[fila][columna] = '';
                }
>>>>>>> 926be054eadf5250a51db482b9fb22b21a1688df
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
<<<<<<< HEAD
}

class Memoria extends Tablero{

    constructor(filas,columnas){
        super(filas, columnas);
        this.hacerParejas();
    }

    hacerParejas(){

        elemetos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        totalParejas = (this.filas * this.columnas) / 2;

        contadorCasillas = this.filas * this.columnas;

        for(i = 0; i < contadorCasillas; i++){
            posFila = Math.floor(Math.random() * this.filas);
            posColumna = Math.floor(Math.random() * this.columnas);

            if (this.arrayTablero[posFila][posColumna] == '') {
                this.arrayTablero[posFila][posColumna] = 'MINA';
                contadorCasillas++;
            }
        }

    }
}

let memoria1 = new Memoria(numFilas, numColumnas);
memoria1.pintarTablero();
console.log(memoria1.arrayTablero);
=======

}

let memoria1 = new Tablero(numFilas, numColumnas);
memoria1.pintarTablero();
>>>>>>> 926be054eadf5250a51db482b9fb22b21a1688df
