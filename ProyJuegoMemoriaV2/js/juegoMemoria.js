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

    //Crea el array que contendrá los elementos del juego.
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
        this.puntosTotales = (filas * columnas / 2) * 10;
        this.casillasTotales = filas * columnas;
        this.numCasillasADespejar = filas * columnas;
        this.primeraId = "";
        this.segundaId = "";
        this.puntos = 0;
        this.aux1 = "";
        this.aux2 = "";
        this.tiempo1 = "";
        this.tiempo2 = "";

        this.pintarTablero();
        this.colocarElementos();
    }
    
    pintarTablero(){

        // Creamos elementos del tablero.
        let contenedor = document.createElement('div');
        let central = document.createElement('div');
        let juego = document.createElement('h1');        
        let nombre = document.createElement('h1');
        let puntuacion = document.createElement('h3');
        let tiempo = document.createElement('h3');
        let btnReinicio = document.createElement('button');
        let tabla = document.createElement('table');
        let fila;
        let columna;

        // Colgados elementos de contenedor, creamos id's y
        // añadimos textos.
        contenedor.id = `contenedor`;
        contenedor.appendChild(central);
        central.id = `central`;
        central.appendChild(juego);
        central.appendChild(nombre);
        puntuacion.id = `pnts`;
        tiempo.id = `tiempo`;
        central.appendChild(puntuacion);
        central.appendChild(tiempo);
        central.appendChild(tabla);

        btnReinicio.id = "btn";
        btnReinicio.type = "button";
        btnReinicio.textContent ='Reiniciar';
        juego.textContent = "Juego de Memoria";
        nombre.textContent = "Jaume Aguiló";
        tiempo.textContent = this.tiempo;

        // Se crea a cada celda (columna) su id.
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

        central.appendChild(btnReinicio);
        document.body.appendChild(contenedor);

        // Se añade al botón la función de reiniciar.
        this.reiniciar = this.reiniciar.bind();
        btnReinicio.addEventListener('click', this.reiniciar);


        let celda;
        this.despejarCelda = this.despejarCelda.bind(this);

        // Se añade a cada celda la función despejarCelda().
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

        // Guarda el primer tiempo del primer clic, de culaquier casilla del tablero.
        if(this.tiempo1 == ""){
            this.tiempo1 = (new Date().getTime()) / 1000;
        }

        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        document.oncontextmenu = function(){return false}
           
        let fila = parseInt(celda.dataset.fila);
        let columna = parseInt(celda.dataset.columna);

        // Elimina el evento de la celda despejada
        celda.removeEventListener('contextmenu', this.despejarCelda);

        // Descueenta una casilla de numCasillasDespejar.
        this.numCasillasADespejar--;
        console.log("Quedan " + this.numCasillasADespejar + " casillas por despejar. Casilla: " + celda.id);

        // this.primeraId coge el innerHtml, el id, la clase destapar, se suma un intento y despejado es "true" de celda.
        this.primeraId = (celda.innerHTML = this.arrayTablero[fila][columna]);
        this.primeraId = document.getElementById(`f${fila}_c${columna}`);
        this.primeraId.className = "destapar";
        this.primeraId.dataset.intentos++;
        this.primeraId.dataset.despejado = "true";

        // Se crean id1 y id2 para poder trabajar en el contexto de este método.
        let id1 = this.primeraId;
        let id2 = this.segundaId;

        // this.segundaId siempre será this.primeraId siemrpre que this.segundaId esté vacía("").
        if(this.segundaId == ""){
            this.segundaId = this.primeraId;
            this.segundaId.dataset.despejado = "true";                     
        }

        // Elije condición cumple la comparación de las casillas.
        if(this.segundaId.innerHTML != this.primeraId.innerHTML){
            this.sonDistintos(id1, id2);
        } else if(id1.innerHTML == id2.innerHTML){            
            this.sonIguales();            
        }
    }
    
    sonDistintos(id1, id2){
        // Añadimos los eventos a las celdas destapadas.
        id1.addEventListener('contextmenu', this.despejarCelda);
        id2.addEventListener('contextmenu', this.despejarCelda);

        // Comprobación que permite saber que casilla reiniciar los intentos si aún no se ha realizado ninguna
        // pareja correcta o cuando la pareja antigua no comparte ninguna casilla en común con la pareja nueva.
        if((this.aux1 != "" && this.aux2 != "")){
            if(this.aux1.dataset.despejado == "true" &&  this.aux2.dataset.despejado == "false"){
                this.aux2.dataset.intentos = 0;
            } else if(this.aux1.dataset.despejado == "false" &&  this.aux2.dataset.despejado == "true"){
                this.aux1.dataset.intentos = 0;
            } else if(this.aux1.dataset.despejado == "false" &&  this.aux2.dataset.despejado == "false"){
                this.aux1.dataset.intentos = 0;
                this.aux2.dataset.intentos = 0;
            }
        }

        // Coge la pareja actual como la pareja vieja.
        this.aux1 = this.primeraId;
        this.aux2 = this.segundaId;
        // Tapamos las casillas.
        this.tapar(id1, id2);
        // Reinicia la segundaId para poder guardar la que vaya a ser la nueva segundaId.
        this.segundaId = "";
    }

    sonIguales(){
        // Comprueba cual de las dos casillas tiene más intentos para saber que puntuación dar
        if(this.primeraId.dataset.intentos > this.segundaId.dataset.intentos){
            this.puntuar(parseInt(this.primeraId.dataset.intentos));
        } else{
            this.puntuar(parseInt(this.segundaId.dataset.intentos));
        }

        // Comprueba que casilla tiene que reiniciar los intentos de la pareja anterior errónea
        if(this.aux1 == "" && this.aux2 == ""){
            this.aux1 = "";
            this.aux2 = "";
        }else if(this.aux1.dataset.despejado == "true" &&  this.aux2.dataset.despejado == "false"){
            this.aux2.dataset.intentos = 0;
        } else if(this.aux1.dataset.despejado == "false" &&  this.aux2.dataset.despejado == "true"){
            this.aux1.dataset.intentos = 0;
        } else{
            this.aux1.dataset.intentos = 0;
            this.aux2.dataset.intentos = 0;
        }

        this.aux1 = "";
        this.aux2 = "";
        this.segundaId = "";        
        this.ganar(this.puntos, this.puntosTotales);
    }

    // Confirma que ha acabado, mostrando un mensaje de enhorabuena 
    // con los puntos y los segundos totales jugados.
    ganar(puntos, puntosTotales){
        this.tiempo2 = (new Date().getTime()) / 1000;
        let tiempoFinal = this.tiempo2 - this.tiempo1;
        if(this.numCasillasADespejar == 0){
            setTimeout(function(){
                let finalizar = confirm(`¡Enhorabuena, has Ganado.\n\nHas conseguido `+
                `${puntos}/${puntosTotales} puntos en ${Math.floor(tiempoFinal)} segundos.`);
                if(finalizar){
                    document.getElementById("contenedor").remove();
                    location.reload();
                }
            }, 250);
        }
    }

    // Vuelve a tapar las casillas con un retraso de tiempo 
    // para poder ver el contenido de la casilla
    tapar(id1, id2){
        id1.dataset.despejado = "false";
        id2.dataset.despejado = "false";
        this.numCasillasADespejar = this.numCasillasADespejar + 2;
        console.log("Vuelven a quedar " + this.numCasillasADespejar + " casillas por despejar.");
        setTimeout(function(){
            id1.className = "td";
            id1.innerHTML = "";                
            id2.className = "td";
            id2.innerHTML = "";                
        }, 100);
    }

    puntuar(intentos){
        if(intentos == 1){
            this.puntos = this.puntos + 10;
        } else if(intentos == 2){
            this.puntos = this.puntos + 5;
        } else if(intentos == 3){
            this.puntos = this.puntos + 2.5;
        }        
        document.getElementById("pnts").textContent = `Puntuación: ${this.puntos}/${this.puntosTotales}`;
    }
    
    reiniciar(){
        let confirmarReinicio = confirm(`¿Estás seguro de reiniciar la partida?`
        + `Si se reinicia se perderá la puntuación.`);
        if(confirmarReinicio){
            document.getElementById("contenedor").remove();
            location.reload();
        }        
    }
}

window.onload = function(){
    let juego1 = new Juego(numFilas, numColumnas);
    console.log(juego1.arrayTablero);   
}