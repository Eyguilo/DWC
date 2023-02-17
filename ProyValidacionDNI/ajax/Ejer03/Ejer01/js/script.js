function showHint(nombre) {
    if (nombre.length == 0) {
        document.getElementById("txtPista").innerHTML = "";
        return;
    } else {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function () {
            document.getElementById("txtPista").innerHTML = this.responseText;
        }

        xmlhttp.open("GET", "php/script.php?nombre=" + nombre);
        xmlhttp.send();
    }
}