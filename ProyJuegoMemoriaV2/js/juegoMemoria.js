/*let numFilas = prompt("Introduzca el número de filas:");
let numColumnas = prompt("Introduzca el número de columnas:");


// Asegura que el tablero cuadre para poder hacer parejas siempre.
while (((numFilas * numColumnas) % 2 != 0) || ((numFilas * numColumnas) < 3) || ((numFilas * numColumnas) > 256)) {
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
}

class Juego extends Tablero {

    constructor(filas, columnas) {
        super(filas, columnas);
        this.casillasTotales = filas * columnas;
        this.numCasillasADespejar = filas * columnas;
        this.primeraId = "";
        this.segundaId = "";
        this.contadorPareja = 0;
        this.puntos = 0;
        this.aux1 = "";
        this.aux2 = "";

        this.pintarTablero();
        this.colocarElementos();        
    }
    
    pintarTablero(){

        let contenedor = document.createElement('div');
        let juego = document.createElement('h1');        
        let nombre = document.createElement('h1');
        let puntuacion = document.createElement('h3');
        let btnReinicio = document.createElement('button');
        let tabla = document.createElement('table');
        let fila;
        let columna;

        contenedor.id = `contenedor`;
        contenedor.appendChild(juego);
        contenedor.appendChild(nombre);
        puntuacion.id = `pnts`;
        contenedor.appendChild(puntuacion);
        contenedor.appendChild(tabla);

        btnReinicio.id = "btn";
        btnReinicio.type = "button";
        btnReinicio.textContent ='Reiniciar';
        juego.textContent = "Juego de Memoria";
        nombre.textContent = "Jaume Aguiló";

        for (let i = 0; i < this.filas; i++) {
            fila = document.createElement('tr');
            tabla.appendChild(fila);

            for (let j = 0; j < this.columnas; j++) {
                columna = document.createElement('td');
                columna.id = `f${i}_c${j}`;
                columna.dataset.fila = i;
                columna.dataset.columna = j;
                columna.dataset.despejado = false;
                columna.dataset.intentos = 0;
                fila.appendChild(columna);
            }
        }
        contenedor.appendChild(btnReinicio);
        document.body.appendChild(contenedor);

        this.reiniciar = this.reiniciar.bind();
        btnReinicio.addEventListener('click', this.reiniciar);

        let celda;
        this.despejarCelda = this.despejarCelda.bind(this);

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {

                celda = document.getElementById(`f${i}_c${j}`);
                celda.addEventListener('contextmenu', this.despejarCelda);
            }
        }
        this.puntuar(0);
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

    despejarCelda(elEvento) {
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        document.oncontextmenu = function(){return false}
           
        let fila = parseInt(celda.dataset.fila);
        let columna = parseInt(celda.dataset.columna);

        // Marcar la celda despejada
        celda.removeEventListener('contextmenu', this.despejarCelda);

        // Descontar una casillas pendiente de despejar
        this.numCasillasADespejar--;
        console.log("Quedan " + this.numCasillasADespejar + " casillas por despejar. Casilla: " + celda.id);

        this.primeraId = (celda.innerHTML = this.arrayTablero[fila][columna]);
        this.primeraId = document.getElementById(`f${fila}_c${columna}`);
        this.primeraId.className = "destapar";
        this.primeraId.dataset.intentos++;
        this.primeraId.dataset.despejado = "true";

        let id1 = this.primeraId;
        let id2 = this.segundaId;

        if(this.segundaId == ""){
            this.segundaId = this.primeraId;
            this.segundaId.dataset.despejado = "true";                     
        }

        if(this.segundaId.innerHTML != this.primeraId.innerHTML){

            this.sonDistintos(id1, id2);

        } else if(id1.innerHTML == id2.innerHTML){
            
            this.sonIguales();
            
        }

        this.contadorPareja++;

        if(this.contadorPareja >= 2){
            this.contadorPareja = 0;
        }
    }
    
    sonDistintos(id1, id2){

        id1.addEventListener('contextmenu', this.despejarCelda);
        id2.addEventListener('contextmenu', this.despejarCelda);

        if(this.numCasillasADespejar > 14 || (this.aux1 != "" && this.aux2 != "")){
            if(this.aux1.dataset.despejado == "true" &&  this.aux2.dataset.despejado == "false"){
                this.aux2.dataset.intentos = 0;
            } else if(this.aux1.dataset.despejado == "false" &&  this.aux2.dataset.despejado == "true"){
                this.aux1.dataset.intentos = 0;
            } else{
                this.auxiliares();
            }
        }

        this.aux1 = this.primeraId;
        this.aux2 = this.segundaId;

        this.tapar(id1, id2);            

        this.segundaId = "";
    }

    sonIguales(){

        if (this.numCasillasADespejar == 14) {
            if(this.aux1 == "" && this.aux2 == ""){
                this.aux1 = "";
                this.aux2 = "";
            } else if(this.primeraId.dataset.despejado == "true" &&  this.segundaId.dataset.despejado == "true"){
                if(this.aux1.dataset.despejado == "true" &&  this.aux2.dataset.despejado == "false"){
                    this.aux2.dataset.intentos = 0;
                    this.aux1 = "";
                    this.aux2 = "";
                } else if(this.aux1.dataset.despejado == "false" &&  this.aux2.dataset.despejado == "true"){
                    this.aux1.dataset.intentos = 0;
                    this.aux1 = "";
                    this.aux2 = "";
                } else{
                    this.auxiliares();
                    this.aux1 = "";
                    this.aux2 = "";
                }
            } 

        } else if(this.aux1 != "" && this.aux2 != "" && this.aux1 != this.primeraId && this.aux2 != this.segundaId){
            if(this.aux1.dataset.despejado == "true" &&  this.aux2.dataset.despejado == "false"){
                this.aux2.dataset.intentos = 0;
            } else if(this.aux1.dataset.despejado == "false" &&  this.aux2.dataset.despejado == "true"){
                this.aux1.dataset.intentos = 0;
            } else{
                this.auxiliares();
            }
            this.aux1 = "";
            this.aux2 = "";
        }  else if(this.aux1 == "" && this.aux2 == ""){
            this.aux1 = "";
            this.aux2 = "";
        } else if(this.aux1.dataset.despejado == "true" &&  this.aux2.dataset.despejado == "false"){
            this.aux2.dataset.intentos = 0;
        } else if(this.aux1.dataset.despejado == "false" &&  this.aux2.dataset.despejado == "true"){
            this.aux1.dataset.intentos = 0;
        }
        
        if(this.primeraId.dataset.intentos > this.segundaId.dataset.intentos){
            this.puntuar(parseInt(this.primeraId.dataset.intentos));
        } else{
            this.puntuar(parseInt(this.segundaId.dataset.intentos));
        }

        this.segundaId = "";
    }

    auxiliares(){
        this.aux1.dataset.intentos = 0;
        this.aux2.dataset.intentos = 0;
    }

    tapar(id1, id2){
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

    puntuar(intentos){
        let puntosTotales = (this.casillasTotales / 2) * 10;
        if(intentos == 1){
            this.puntos = this.puntos + 10;
        } else if(intentos == 2){
            this.puntos = this.puntos + 5;
        } else if(intentos == 3){
            this.puntos = this.puntos + 2.5;
        }
        
        document.getElementById("pnts").textContent = `Puntuación: ${this.puntos}/${puntosTotales}`;
    }
    
    reiniciar(){
        //let confirmarReinicio = confirm("¿Estás seguro de reiniciar la partida? Si se reinicia se perderá la puntuación actual.");
        //if(confirmarReinicio){
            document.getElementById("contenedor").remove();
            let juego1 = new Juego(4, 4);
            //location.reload();
        //}
    }
}

window.onload = function(){
    //let juego1 = new Juego(numFilas, numColumnas);
    let juego1 = new Juego(4, 4);
    console.log(juego1.arrayTablero);   
}