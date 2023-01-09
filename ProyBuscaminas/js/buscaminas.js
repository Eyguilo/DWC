let maxFilas = prompt('¿Cuántas filas quieres?');
let maxColumnas = prompt('¿Cuántas columnas quieres?');
let numMinas = prompt('¿Cuántas minas quieres introducir?');


// Crear array bidimensional para guardar las minas
function crearArray(maxFilas, maxColumnas){

    let arrayTablero = [];

    for (let fila = 0; fila < maxFilas; fila++) {
        arrayTablero[fila] = new Array(maxColumnas);

        for (let columna = 0; columna < maxColumnas; columna++) {
            arrayTablero[fila][columna] = '';
        }
    }
    return arrayTablero;
}

//Coloca las minas en le array bidimensional
function colocarMinas(arrayTablero, maxFilas, maxColumnas){

    let contadorMinas = 0;
    let posFila;
    let posColumna;

    while (contadorMinas < numMinas) {
        posFila = Math.floor(Math.random()*maxFilas);
        posColumna = Math.floor(Math.random()*maxColumnas);

        if (arrayTablero[posFila][posColumna] != 'MINA') {
            arrayTablero[posFila][posColumna] = 'MINA';
            contadorMinas++ ;
        }
    }
    return arrayTablero;
}

//Coloca los números en el array alrededor de las bombas
function colocarNumeros(arrayTablero, maxFilas, maxColumnas){

    let numMinasAlrededor;
    for (let fila = 0; fila < maxFilas; fila++) {
        for (let columna = 0; columna < maxColumnas; columna++) {
            numMinasAlrededor = 0;
            if (arrayTablero[fila][columna] != 'MINA'){
                for (let cFila = fila - 1; cFila < fila + 2; cFila++) {
                    if(cFila >= 0 && cFila < maxFilas){                 
                        for (let cColumna = columna - 1; cColumna < columna + 2; cColumna++) {
                            if ((cColumna >= 0 && cColumna < maxColumnas) && (arrayTablero[cFila][cColumna] == 'MINA')) {
                                
                                numMinasAlrededor++;

                            } 
                        }
                    }   
                }
                arrayTablero[fila][columna] = numMinasAlrededor;
            }
        }
    }
    return arrayTablero;
}

//Creamos tablero y colocamos los datos del array y printamos
function pintarTablero(arrayTablero, maxFilas, maxColumnas){

    document.write('<table>');

    for (let i = 0; i < maxFilas; i++) {
        document.write('<tr>');

        for (let j = 0; j < maxColumnas; j++) {
            if(arrayTablero[i][j] != 0){
                document.write('<td>' + arrayTablero[i][j] + '</td>');

            }else{
                document.write('<td></td>');
            }
        }

        document.write('</tr>');
    }
    document.write('</table>');

    return arrayTablero;
}


tablero = crearArray(maxFilas, maxColumnas);

tablero = colocarMinas(tablero, maxFilas, maxColumnas);

tablero = colocarNumeros(tablero, maxFilas, maxColumnas);

tablero = pintarTablero(tablero, maxFilas, maxColumnas);