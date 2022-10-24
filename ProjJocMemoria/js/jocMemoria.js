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

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = [];

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
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

class Joc extends Tablero{

    constructor(filas, columnas){
        super(filas,columnas);

        this.colocarElementos();
    }

    colocarElementos() {

        let elementos = ["🧡", "😈", "💚", "😳", "💜", "🤎", "🖤", "😊", "🤢", "💩"];
        let casillasTablero = this.filas * this.columnas;
        let contadorCasillas = 0;

        while (contadorCasillas < casillasTablero) {
            let posFila = Math.floor(Math.random() * this.filas);
            let posColumna = Math.floor(Math.random() * this.columnas);

            for(let i = 0; i < 2; i++){

                for(let j = 0; j < elementos.length; j++){
                    
                    this.arrayTablero[posFila][posColumna] = elementos[j];
                    contadorCasillas++
                }
            }            
        }
    }
}

let joc1 = new Joc(numFilas, numColumnas);
console.log(joc1.arrayTablero);
joc1.pintarTablero();