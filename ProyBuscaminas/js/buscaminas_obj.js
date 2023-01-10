class Tablero {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.crearTablero();
    }

    crearTablero() {
        // Crear array bidimensional para guardar las minas
        this.arrayTablero = [];

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = [];

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
            }
        }
    }

    dibujarTableroHTML() {
        // Creamos el tablero en html
        document.write('<table>');

        for (let i = 0; i < this.filas; i++) {
            document.write('<tr>');

            for (let j = 0; j < this.columnas; j++) {
                document.write(`<td></td>`);
            }

            document.write('</tr>');
        }
        document.write('</table>');
    }

    dibujarTableroDOM(){
        // Creamos el tablero en DOM
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

    
    

    modificarFilas(nuevasFilas) {
        // Modificar el número de filas y volver a crear el tablero con las filas nuevas
        this.filas = nuevasFilas;

        this.crearTablero();
    }

    modificarColumnas(nuevasColumnas) {
        // Modificar el número de columnas y volver a crear el tablero con las columnas nuevas
        this.columnas = nuevasColumnas;

        this.crearTablero();
    }


}

class Buscaminas extends Tablero {
    constructor(filas, columnas, numMinas) {
        super(filas, columnas);
        this.numMinas = numMinas;
        this.numBanderas = 0;
        this.numCasillasADespejar = filas * columnas - numMinas;

        this.colocarMinas();
        this.colocarNumMinas();
        this.dibujarTableroDOM();
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
            };
        };
    }

    colocarNumMinas() {
        let numMinasAlrededor;

        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                numMinasAlrededor = 0;
                if (this.arrayTablero[fila][columna] != 'MINA') {
                    for (let cFila = fila - 1; cFila <= fila + 1; cFila++) {
                        if (cFila >= 0 && cFila < this.filas) {
                            for (let cColumna = columna - 1; cColumna <= columna + 1; cColumna++) {
                                if (cColumna >= 0 && cColumna < this.columnas &&
                                    this.arrayTablero[cFila][cColumna] == 'MINA') {
                                    numMinasAlrededor++;
                                }
                            }
                        }
                        this.arrayTablero[fila][columna] = numMinasAlrededor;
                    }
                }
            }
        }
    }

    dibujarTableroDOM(){
        super.dibujarTableroDOM();

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

    marcar(elEvento) {

        document.oncontextmenu = function(){return false}

        // Capturar el evento y el nodo que lo generó
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;

        // Crear el elemento img
        let imagen = document.createElement('img');
        imagen.style.height = "35px";
        imagen.style.marginTop = "5px";


        // Definir las rutas relativas donde se encuentran las imágenes
        let rutaBandera = 'imagenes/flag-fill.svg';
        let rutaInterrogante = 'imagenes/question-lg.svg';

        // Definir la ruta relativa de la imagen en la celda seleccionada
        let rutaImagen;

        // Buscar la ruta relativa de la imagen para la celda seleccionada
        if (celda.lastChild != null) {
            rutaImagen = celda.lastChild.src.split('/').slice(-2).join('/');
        }

        // Comprobar imagen en la celda
        let noHayImagen = (celda.lastChild == null);
        let esBandera = (rutaImagen == rutaBandera);
        let esInterrogante = (rutaImagen == rutaInterrogante);

        // Marcar las celdas con la imagen adecuada
        if (noHayImagen) {
            celda.removeEventListener('click', this.despejar);
            imagen.src = "imagenes/flag-fill.svg";
            this.numBanderas++;
            celda.appendChild(imagen);
            if (this.numBanderas == this.numMinas && this.numCasillasADespejar == 0) {
                this.resolverTablero(celda, true);
            }
        } else if (esBandera) {
            celda.addEventListener('click', this.despejar);
            celda.lastChild.src = "imagenes/question-lg.svg";
            this.numBanderas--;
        } else if (esInterrogante) {
            celda.removeChild(celda.lastChild);
        }

        console.log("Número de banderas colocadas " + this.numBanderas + ".");            
    }

    resolverTablero(celda, hasGanado) {
        let bombaSeleccionadaMal;
        let rutaBandera = "imagenes/flag-fill.svg";
        let arrayFilas = celda.parentNode.parentNode.childNodes;
        let arrayColumnas;

        let fila;
        let columna;
        let valorCelda;


        for (let tr of arrayFilas) {
            arrayColumnas = tr.childNodes;
            for (let td of arrayColumnas){
                td.removeEventListener('click', this.despejar);
                td.removeEventListener('contextmenu', this.marcar);

                fila = td.dataset.fila;
                columna = td.dataset.columna;
                valorCelda = this.arrayTablero[fila][columna]
                if (td.lastChild != null){
                    bombaSeleccionadaMal = (td.lastChild.src ==  rutaBandera && valorCelda != 'MINA');
                
                    if (bombaSeleccionadaMal){
                        td.lastChild.src = "";
                        td.style.backgroundColor = 'red';
                        td.innerHTML = valorCelda;
                        hasGanado = false;
                    } else if (valorCelda == 'MINA') {
                        celda.className = "mina";
                    }
                } else if (valorCelda == 'MINA') {
                    td.className = "mina";
                    celda.style.backgroundColor = 'red';
                }
            }   
        }

        if (hasGanado) {
            alert('ENHORABUENA, HAS GANADO');
        } else {
            alert('LO SIENTO, HAS PERDIDO');
        }
    }
}

window.onload = function() {
    let buscaminas1 = new Buscaminas(5, 5, 1);
}