function showHint(nombre) {
    if (nombre.length == 0) {
        document.getElementById("txtPista").innerHTML = "";
        return;
    } else {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function () {
            document.getElementById("txtPista").innerHTML = this.responseText;
        }
        console.log("php/city.php?nombre=" + nombre);

        xmlhttp.open("GET", "php/city.php?nombre=" + nombre);
        xmlhttp.send();
    }
}