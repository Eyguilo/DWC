window.onload = function () {

    let nodoDiv = document.getElementById('info');
    let nodosLink = document.getElementById('a');
    let nodoP1 = document.createElement('p');
    nodoP1.innerHTML = `Números de enlaces de la página = ${nodosLink}`;
    nodoDiv.appendChild(nodoP1);

    let nodosParrafo = document.getElementsByTagName('p');
    let parrafosDiv = nodoDiv.getElementsByTagName('p');
    let nodoP2 = document.createElement('p');
    let numeroParrafos = parseInt(nodosParrafo.length) - parseInt(parrafosDiv.length);
    nodoP2.innerHTML = `Número de párrafos ${numeroParrafos}`;
    nodoDiv.appendChild(nodoP2);

    let nodoP3 = document.createElement('p');
    nodoP3.innerHTML = `El penúltimo enlace apunta a = ${nodosLink[nodosLink - 2]}`;
    nodoDiv.appendChild(nodoP3);


    let nodoP4 = document.createElement('p');
    nodoP4.innerHTML = `El último enlace apunta a = ${nodosLink[nodosLink - 1]}`;
    nodoDiv.appendChild(nodoP4);

    let contadorEnlaces = 0;

    for (enlace in nodosLink) {
        if (enlace.href == 'http://prueba') {
            contadorEnlaces++;
        }
    }

    let nodoP5 = document.createElement('p');
    nodoP5.innerHTML = `${contadorEnlaces} enlaces apuntan a http://prueba`;
    nodoDiv.appendChild(nodoP5);

    let nodoP6;
    let enlacesParrafo;
    let parrafo
    for(let i = 0; i < numeroParrafos; i ++){
        parrafo = nodosParrafo[i + parseInt(parrafosDiv.length)];
        enlacesParrafo = parrafo.getElementsByTagName('a');
        nodoP6.createElement('p');
        nodoP6innerHTML = (`Número de enlaces del párrafo = ${i + 1} = ${enlacesParrafo.length}`)
        nodoDiv.appendChild(nodoP6)
    }

}



