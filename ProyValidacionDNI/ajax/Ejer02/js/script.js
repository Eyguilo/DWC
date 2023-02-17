function showHint(nombre) {
    if (nombre.length == 0) {
        document.getElementById("txtPista").innerHTML = '';
        return;
    } else {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function () {
            document.getElementById('tabla').innerHTML = '';

            let arrayPaises = this.responseText.split(', ');
            document.getElementById('txtPista').innerHTML = '';
            console.log(arrayPaises);

            let header = document.createElement('th');
            document.getElementById('tabla').appendChild(header);
            header.textContent = "PAÏSOS";

            arrayPaises.forEach(pais => {
                console.log(pais);
                let fila = document.createElement('tr');
                document.getElementById('tabla').appendChild(fila)
                let columna = document.createElement('td');
                fila.appendChild(columna);
    
                columna.innerHTML = pais;                
            });
        }

        xmlhttp.open("GET", "php/script.php?nombre=" + nombre);     
        xmlhttp.send();
    }
}