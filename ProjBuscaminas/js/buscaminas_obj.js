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

    dibujarTableroDOM() {
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
                fila.appendChild(columna);
            }
        }

        document.body.appendChild(tabla);
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
        super.dibujarTableroDOM();

        let celda;

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                celda = document.getElementById(`f${i}_c${j}`);

                celda.addEventListener('click', this.despejar.bind(this));
                celda.addEventListener('contextmenu', this.marcar.bind(this));
            }
        }
    }

    despejar(celda) {

        let fila = celda.dataset.fila;
        let columna = celda.dataset.columna;

        let valorCelda = this.arrayTablero[fila][columna];
        let esNumero = (valorCelda != 'MINA' && valorCelda != 0);
        let esBomba = (valorCelda == 'MINA');
        let bombaSeleccionadaMal;

        let rutaBandera = "../imagenes/flag-fill.svg";
        
        let arrayFilas;
        let arrayColumnas; 

        if (esNumero) {
            celda.innerHTML = valorCelda;
            celda.removeEventListener('click', this.despejar.bind(this));
            celda.removeEventListener('contextmenu', this.marcar.bind(this));
            celda.className = "vacio";

            switch (celda.innerHTML) {
                case "1":
                    celda.setAttribute("style", "color: blue;");
                    break;
                case "2":
                    celda.setAttribute("style", "color: green;");
                    break;
                case "3":
                    celda.setAttribute("style", "color: red;");
                    break;
                case "4":
                    celda.setAttribute("style", "color: purple;");
                    break;
                case "5":
                    celda.setAttribute("style", "color: aqua;");
                    break;
                case "6":
                    celda.setAttribute("style", "color: yellow;");
                    break;
                case "7":
                    celda.setAttribute("style", "color: black;");
                    break;
                default:
                    break;
            }
        } else if (esBomba) {
            
            arrayFilas = celda.parentNode.parentNode.childNodes;
            for (let tr of arrayFilas) {
                arrayColumnas = tr.childNodes;
                for (let td of arrayColumnas){
                    td.removeEventListener('click', this.despejar.bind(this));
                    td.removeEventListener('contextmenu', this.marcar.bind(this));

                    fila = td.dataset.fila;
                    columna = td.dataset.columna;
                    valorCelda = this.arrayTablero[fila][columna];
                    if (td.lastChild != null){
                        bombaSeleccionadaMal = (td.lastChild.src == rutaBandera && valorCelda != 'MINA');
                    
                        if (bombaSeleccionadaMal){
                            td.lastChild.src = "";
                            td.style.backgroundColor = 'red';
                            td.innerHTML = valorCelda;
                        } else if (valorCelda == 'MINA') {
                            celda.className = "mina";
                        }
                    } else if (valorCelda == 'MINA') {
                            celda.className = "mina";
                    }
                }
            }
            alert(`¡HAS PERDIDO!`);
        } else{
            celda.className = "vacio";

            

            for (let f = fila -1; f < f +1; f++) {
                if(f>=0 || f<= this.fila){
                    for (let c = columna -1; c < c +1; c++) {
                        if(c>=0 || c<= this.columna){   
                            if(this.arrayTablero[f][c] == 0 && this.arrayTablero[f][c].className != "vacio") {

                                let celdaComprobar = document.getElementById(`f${f}_c${c}`)

                                console.log(this.arrayTablero[f][c]);
                                this.despejar(celdaComprobar);
                            }else{
                                this.despejar(this.arrayTablero[f][c]);
                                break;
                            }
                        }            
                    }
                }
            }
        }
    }

    marcar(elEvento){
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        document.oncontextmenu = function(){return false};
        celda.removeEventListener('click', this.despejar.bind(this));
        celda.removeEventListener('contextmenu', this.marcar.bind(this));

        if(celda.className != "vacio"){
            switch(celda.className){
                case "":
                    celda.className = "bandera";
                    break;
                case "bandera":
                    celda.className = "interrogante";
                    break;
                default:
                    celda.className = "";
                    break;
            }
        }
    }

    despejarEvento(elEvento){
        let evento = elEvento|| window.event;
        let celda = evento.currentTarget;

        this.despejar(celda);
    }
}

window.onload = function () {
    var buscaminas1 = new Buscaminas(5, 5, 2);
    buscaminas1.dibujarTableroDOM();
    console.log(buscaminas1.arrayTablero);
}