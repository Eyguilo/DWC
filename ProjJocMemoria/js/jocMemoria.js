let numFilas = prompt("Introduzca el número de filas:");
let numColumnas = prompt("Introduzca el número de columnas:");


// Asegura que el tablero cuadre para poder hacer parejas siempre.
while (((numFilas * numColumnas) % 2 != 0) || ((numFilas * numColumnas) < 3) || ((numFilas * numColumnas) > 256)) {
    alert("POSIBLES ERRORES:\n- No has introducido un número par de casillas.\n- Es solo de una única pareja.\n- Has introducido un carácter que no es un número.\n- Número máximo de casillas son 256 (16x16).");
    numFilas = prompt("Introduzca de nuevo el número de filas:");
    numColumnas = prompt("Introduzca de nuevo el número de columnas:");
}

class Tablero {

    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;

        this.crearTablero();
    }

    //Método que crea el array que contendrá los elementos del juego
    crearTablero() {

        this.arrayTablero = [];

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = [];

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
            }
        }
    }

    //Método que muestra en el navegador el array.
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

class Juego extends Tablero {

    constructor(filas, columnas) {
        super(filas, columnas);

        this.colocarElementos();
    }

    colocarElementos() {

        let elementos = ["🧡", "😈", "💚", "😳", "💜", "🤎", "🖤", "😊", "🤢", "💩"];
        let casillasTablero = this.filas * this.columnas;
        let contadorCasillas = 0;   // Asegura que bucle while dure hasta que estén llenos todos los huecos del tablero.
        let contadorParejas = 0;    // Asegura que se introducen de dos en dos los elemetnos.
        let contadorElementos = 0;  // Permite el aumento del array para cambiar de elemento una vez ya se ha introducido la pareja
                                    // y a su vez empezar de nuevo el array.


        while (contadorCasillas < casillasTablero) {

            if (contadorParejas == 2) { // Reinicia el contador de parejas y que el siguiente elemento del array
                contadorParejas = 0;    // solo se coloque dos veces, a su vez aumenta el contador de elementos
                contadorElementos++;    // para que se coloque el siguiente elemento del array
            }
            if (contadorElementos == 10) { // Reinicia el contador de los elementos para que el array de los 
                contadorElementos = 0;     // de los elementos empiece a colocar los elementos desde 0 de nuevo.
            }

            let posFila = Math.floor(Math.random() * this.filas);
            let posColumna = Math.floor(Math.random() * this.columnas);

            while (contadorParejas < 2 && this.arrayTablero[posFila][posColumna] == '') {

                this.arrayTablero[posFila][posColumna] = elementos[contadorElementos];
                contadorCasillas++;
                contadorParejas++;
            }
        }
    }
}

let juego1 = new Juego(numFilas, numColumnas);
console.log(juego1.arrayTablero);
juego1.pintarTablero();