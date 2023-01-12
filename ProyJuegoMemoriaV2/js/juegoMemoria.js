//let numFilas = prompt("Introduzca el número de filas:");
//let numColumnas = prompt("Introduzca el número de columnas:");


// Asegura que el tablero cuadre para poder hacer parejas siempre.
/*while (((numFilas * numColumnas) % 2 != 0) || ((numFilas * numColumnas) < 3) || ((numFilas * numColumnas) > 256)) {
    alert("POSIBLES ERRORES:\n- No has introducido un número par de casillas.\n- Es solo de una única pareja.\n- Has introducido un carácter que no es un número.\n- Número máximo de casillas son 256 (16x16).");
    numFilas = prompt("Introduzca de nuevo el número de filas:");
    numColumnas = prompt("Introduzca de nuevo el número de columnas:");
}*/

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
        this.numCasillasADespejar = filas * columnas;
        this.primeraId = "";
        this.segundaId = "";
        this.contadorPareja = 0;

        this.colocarElementos();
        this.pintarTablero();
    }

    pintarTablero(){
        super.pintarTablero();

        let celda;

        this.despejar = this.despejar.bind(this);

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++){
                celda = document.getElementById(`f${i}_c${j}`);

                celda.addEventListener('contextmenu', this.despejar);
            }
        }
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

        document.oncontextmenu = function(){return false}
        
        this.despejarCelda(celda);
    }

    despejarCelda(celda) {
        let fila = parseInt(celda.dataset.fila);
        let columna = parseInt(celda.dataset.columna);

        // Marcar la celda despejada
        //celda.dataset.despejado = true;
        celda.removeEventListener('contextmenu', this.despejar);

        // Descontar una casillas pendiente de despejar
        this.numCasillasADespejar--;
        console.log("Quedan " + this.numCasillasADespejar + " casillas por despejar.");

        this.primeraId = (celda.innerHTML = this.arrayTablero[fila][columna]);
        this.primeraId = document.getElementById(`f${fila}_c${columna}`);
        this.primeraId.className = "destapar";

        let id1 = this.primeraId;
        let id2 = this.segundaId;

        if(this.segundaId == ""){
            this.segundaId = this.primeraId;
            this.segundaId = document.getElementById(`f${fila}_c${columna}`);
            this.primeraId.dataset.despejado = "true";
            this.segundaId.dataset.despejado = "true";
        }

        if(this.segundaId.dataset.despejado == "true"){
            this.primeraId.dataset.despejado = "true";
        }

        if(this.segundaId.innerHTML != this.primeraId.innerHTML && this.segundaId.dataset.despejado == "true"){
            this.primeraId = "";
            this.segundaId = "";
            id1.addEventListener('contextmenu', this.despejar);
            id2.addEventListener('contextmenu', this.despejar);
            id1.dataset.despejado = "false";
            id2.dataset.despejado = "false";
            this.numCasillasADespejar = this.numCasillasADespejar + 2;
            console.log("Vuelven a quedar " + this.numCasillasADespejar + " casillas por despejar.");
            setTimeout(function(){
                console.log("Retraso de 500ms.");
                id1.className = "td";
                id1.innerHTML = "";                
                id2.className = "td";
                id2.innerHTML = "";                
            }, 500);
        }

        this.contadorPareja++;

        if(this.contadorPareja >= 2){
            this.segundaId = "";
            this.contadorPareja = 0;
        }
    }    
}

window.onload = function(){
    let juego1 = new Juego(6, 6);
    //let juego1 = new Juego(numFilas, numColumnas);
    console.log(juego1.arrayTablero);   
}
