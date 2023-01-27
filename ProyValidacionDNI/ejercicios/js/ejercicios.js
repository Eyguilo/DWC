function validarTlfFijo() {
    let patron = /^[9,8][1-8][0-9]{7}$/;

    this.className = "";
    if (patron.test(this.value)) {
        this.className = "verde";
    }
}

function validarTlfFijoConPrefijo() {
    let patron = /^\(\+[0-9]{1-3}\)([89][^09]|[67][0-9])[0-9]{7}$/;

    this.className = "";
    if (patron.test(this.value)) {
        this.className = "verde";
    }
}

window.addEventListener('load', function(){
    let nombre = document.getElementById('nombre');

    nombre.addEventListener('keyup', validarTlfFijoConPrefijo);
});
