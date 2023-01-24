/**
 * Función para validar el nombre y apellidos del formulario
 */
function validarNombre() {
    let patron = /^[A-Za-záéíóúüàèiòÁÉÍÓÚÀÈÒÜñÑçÇ ]{2,}$/;

    this.className = "";
    if (patron.test(this.value)) {
        this.className = "verde";
    }
}

/**
 * Función para validar el email del formulario
 */

function validarEmail() {
    let patron = /^.+@.+$/;

    this.className = "";
    if (patron.test(this.value)) {
        this.className = "verde";
    }
}





window.addEventListener('load', function(){
    let nombre = document.getElementById('nombre');
    let apellidos = document.getElementById('apellidos');
    let email = document.getElementById('email');

    nombre.addEventListener('keyup', validarNombre);
    apellidos.addEventListener('keyup', validarNombre);
    email.addEventListener('keyup', validarEmail);
});

window.addEventListener('load', function(){
    let email = document.getElementById('email');

    email.addEventListener('keyup', validarNombre);
});