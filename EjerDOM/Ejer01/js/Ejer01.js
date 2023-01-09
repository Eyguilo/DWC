window.onload = function() {
    let nodoDiv = document.getElementById("info");
    let nodosLink = document.getElementsByTagName('a');
    let nodoP1 = document.createElement('p');
    nodoP1.innerHTML = `Nombre d'enllaços de la pàgina = ${nodosLink.length}`
    nodoDiv.appendChild(nodoP1);

    let nodosParrafo = document.getElementsByTagName('p');
    let parrafosDiv = nodoDiv.getElementsByTagName('p');
    let nodoP2 = document.createElement('p');
    let numeroParrafos = parseInt(nodosParrafo.length) - parseInt(parrafosDiv.length);
    nodoP2.innerHTML = `Nombre de paràgrafs = ${numeroParrafos}`;
    nodoDiv.appendChild(nodoP2);

    let nodoP3 = document.createElement('p');
    nodoP3.innerHTML = `El penúltim enllaç apunta a = ${nodosLink[nodosLink.length - 2]}`;
    nodoDiv.appendChild(nodoP3); 

    let nodoP4 = document.createElement('p');
    nodoP4.innerHTML = `L'últim enllaç apunta a = ${nodosLink[nodosLink.length - 1]}`;
    nodoDiv.appendChild(nodoP4);

    let contadorEnlaces = 0;
    for (enlace of nodosLink) {
        if (enlace.href == 'http://prueba/') {
            contadorEnlaces++;
        }
    }

    let nodoP5 = document.createElement('p');
    nodoP5.innerHTML = `${contadorEnlaces} enllaços apunten a http://prueba/`;
    nodoDiv.appendChild(nodoP5);

    
    let nodoP6;
    let enlacesParrafo;
    let parrafo;
    for (let i = 0; i < numeroParrafos; i++) {
        parrafo = nodosParrafo[i + parseInt(parrafosDiv.length)];
        enlacesParrafo = parrafo.getElementsByTagName('a');
        nodoP6 = document.createElement('p');
        nodoP6.innerHTML = `Nombre d'enllaços del paràgraf = ${i + 1} = ${enlacesParrafo.length}`;
        nodoDiv.appendChild(nodoP6);
    }
}   
