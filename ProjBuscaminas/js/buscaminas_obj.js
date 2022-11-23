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

    //Modificar filas y volver a crear el tablero con las
    //filas nuevas
    modificarFilas(nuevasFilas) {
        this.filas = nuevasFilas;
        this.crearTablero();
    }

    //Modificar columnas y volver a crear el tablero con las
    //columnas nuevas
    modificarColumnas(nuevasColumnas) {
        this.columnas = nuevasColumnas;
        this.crearTablero();
    }
}

class Buscaminas extends Tablero {
    constructor(filas, columnas, numMinas) {
        super(filas, columnas);
        this.numMinas = numMinas;
        this.colocarMinas();
        this.colocarNumeros();
    }

    colocarMinas() {
        let contadorMinas = 0;
        let posFila;
        let posColumna;

        while (contadorMinas < this.numMinas) {
            posFila = Math.floor(Math.random() * this.filas);
            posColumna = Math.floor(Math.random() * this.columnas);

            if (this.arrayTablero[posFila][posColumna] != 'MINA') {
                this.arrayTablero[posFila][posColumna] = 'MINA';
                contadorMinas++;
            }
        }
    }

    colocarNumeros() {
        let numMinasAlrededor;

        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                numMinasAlrededor = 0;
                if (this.arrayTablero[fila][columna] != 'MINA') {
                    for (let cFila = fila - 1; cFila < fila + 2; cFila++) {
                        if (cFila >= 0 && cFila < this.filas) {
                            for (let cColumna = columna - 1; cColumna < columna + 2; cColumna++) {
                                if ((cColumna >= 0 && cColumna < this.columnas) && (this.arrayTablero[cFila][cColumna] == 'MINA')) {

                                    numMinasAlrededor++;

                                }
                            }
                        }
                    }
                    this.arrayTablero[fila][columna] = numMinasAlrededor;
                }
            }
        }
    }

    dibujarTableroDOM() {

        let tablero = document.createElement('table');
        let tr;
        let td;

        for (let i = 0; i < this.filas; i++) {
            tr = document.createElement('tr');
            tablero.appendChild(tr);

            for (let j = 0; j < this.columnas; j++) {
                td = document.createElement('td');
                td.setAttribute("id", `f${i}_c${j}`);
                tr.appendChild(td);

                td.dataset.fila=i;
                td.dataset.columna=j;
                td.setAttribute("class","vacio");

                td.addEventListener('click', this.despejar);
                td.addEventListener('contextmenu', this.marcar);
            }
        }

        document.body.appendChild(tablero);
    }

    despejar(){

        for (let i = 0; i < this.fila; i++) {
        
            for (let j = 0; j < this.columna; j++) {
                
            }
        }

        this.innerHTML="1";

        if(this.arrayTablero[this.fila][this.columna] == 1){
            
        }

    }

    marcar(){
        document.oncontextmenu = function(){return false}

        switch (this.className) {
            case "vacio":
                this.className = "bandera";
                break;
            case "bandera":
                this.className = "interrogante";
                break;
            default:
                this.className = "vacio";
                break;
        }
            
    }
}

document.addEventListener("DOMContentLoaded", function (event) {

    let buscaminas1 = new Buscaminas(6, 6, 5);
    console.log(buscaminas1.arrayTablero);
    buscaminas1.dibujarTableroDOM();
});
