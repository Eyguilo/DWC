function validarTlfFijo() {
    let patron = /^[9,8][1-8][0-9]{7}$/;

    this.className = "";
    if (patron.test(this.value)) {
        this.className = "verde";
    }
}

window.addEventListener('load', function(){
    let nombre = document.getElementById('nombre');

    nombre.addEventListener('keyup', validarTlfFijo);
});
