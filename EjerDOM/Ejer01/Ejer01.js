class Tablero{

    constructor(filas, columnas){
        this.filas = filas;
        this.columnas = columnas

        this.crearArray();
    }

    crearArray(filas, columnas){

        let arrayTablero = [];

        for (let fila = 0; fila < filas; fila++) {
            arrayTablero[fila] = new Array(columnas);

            for (let columna = 0; columna < columnas; columna++) {
                arrayTablero[fila][columna] = '';
            }
        }
        return arrayTablero;
    }

    colocarNumeros(arrayTablero, filas, columnas){

        for (let i = 0; i < filas; i++) {

            for (let j = 0; j < columnas - 1; j++) {

                let numeroColor = Math.floor(Math.random() * 255);

                let nuevoColor = 0;
                nuevoColor = nuevoColor + numeroColor;
                arrayTablero[i][j] = numeroColor;
                
            }
            
        }
        return arrayTablero;
    }
}

let tablero1 = new Tablero();
console.log(tablero1.colocarNumeros);

