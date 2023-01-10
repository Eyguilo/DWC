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

    //Crea el array que contendrá los elementos del juego
    crearTablero() {

        this.arrayTablero = [];

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = [];

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
            }
        }
    }

    //Muestra en el navegador el array.
    pintarTablero() {
        let tabla = document.createElement('table');
        let fila;
        let columna;

        for (let i = 0; i < this.filas; i++) {
            fila = document.createElement('tr');
            tabla.appendChild(fila);

            for (let j = 0; j < this.columnas; j++) {
                columna = document.createElement('td');
                columna.id = `f${i}_c${j}`;
                columna.dataset.fila = i;
                columna.dataset.columna = j;
                columna.dataset.despejado = false;
                fila.appendChild(columna);
            }
        }
        document.body.appendChild(tabla);
    }
}

class Juego extends Tablero {

    constructor(filas, columnas) {
        super(filas, columnas);

        this.colocarElementos();
        this.pintarTablero();
    }

    pintarTablero(){
        super.pintarTablero();

        let celda;

        this.despejar = this.despejar.bind(this);
        this.marcar = this.marcar.bind(this);

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++){
                celda = document.getElementById(`f${i}_c${j}`);

                celda.addEventListener('click', this.despejar);
                celda.addEventListener('contextmenu', this.marcar);
            }
        }
        console.log(this.arrayTablero);
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

    despejar(elEvento) {
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        
        this.despejarCelda(celda);
    }

    despejarCelda(celda) {
        let fila = parseInt(celda.dataset.fila);
        let columna = parseInt(celda.dataset.columna);

        // Marcar la celda despejada
        celda.dataset.despejado = true;
        celda.style.backgroundColor = "lightgrey";
        celda.removeEventListener('click', this.despejar);
        celda.removeEventListener('contextmenu', this.marcar);

        // Descontar una casillas pendiente de despejar
        this.numCasillasADespejar--;
        console.log("Quedan " + this.numCasillasADespejar + " casillas por despejar.");

        let valorCelda = this.arrayTablero[fila][columna];
        let esNumero = (valorCelda != 'MINA' && valorCelda != 0);
        let esBomba = (valorCelda == 'MINA');
        let esVacio = (valorCelda == 0);
        let estaDespejado;
        
    
        let celdaNueva;

        if (esNumero) {
            celda.innerHTML = valorCelda;

            if (this.numCasillasADespejar == 0) {
                this.resolverTablero(celda, true);
            }    
            
        } else if (esBomba) {
            this.resolverTablero(celda,false);

        }else if (esVacio) {

            for (let cFila = fila - 1; cFila <= fila + 1; cFila++) {
                if (cFila >= 0 && cFila < this.filas) {
                    for (let cColumna = columna - 1; cColumna <= columna + 1; cColumna++) {
                        if (cColumna >= 0 && cColumna < this.columnas) {
                            celdaNueva = document.getElementById(`f${cFila}_c${cColumna}`)
                            estaDespejado = (celdaNueva.dataset.despejado == 'true');
                            if (!estaDespejado) {
                                console.log(`f${cFila}_c${cColumna}`);
                                this.despejarCelda(celdaNueva);
                            }
                        }
                    }
                }
            }
            if (this.numCasillasADespejar == 0) {
                this.resolverTablero(celda, true);
            }
        }
    }

    marcar(elEvento){

    }
}

window.onload = function(){
    let juego1 = new Juego(numFilas, numColumnas);
    console.log(juego1.arrayTablero);   
}
