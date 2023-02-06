/**
 * Función para validar varios patrones
 */
function validarDatos(){
    let patrones = new Map();

    patrones.set("nombre", /^[A-Za-záéíóúüàèiòÁÉÍÓÚÀÈÒÜñÑçÇ]{2,}$/);
    patrones.set("apellidos", /^[A-Za-záéíóúüàèiòÁÉÍÓÚÀÈÒÜñÑçÇ]{2,}$/);
    patrones.set("email", /^.+@.+$/);
    patrones.set("telefonoNacional", /^([89][^09]|[67][0-9])[0-9]{7}$/);
    patrones.set("telefonoConPrefijo", /^\(\+[0-9]{1,3}\)([89][^09]|[67][0-9])[0-9]{7}$/);
    patrones.set("fecha", /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}$/)
    patrones.set("codigoPostal", /^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/);
    patrones.set("tiempo", /^([0-1][0-9]|2[0-3])(:([0-5][0-9])){2}$/);

    let patronVisa = /^4([0-9]{12}|[0-9]{15})$/;
    let patronMasterCard = /^5[1-5][0-9]{14}$/;
    let patronDiscover = /^(6011[0-9]{12}|5[0-9]{14})$/;
    let patronAmericanExpress =/^(34|37)[0-9]{13}$/;
    let patronDinersClub = /^(30[0-5][0-9]{11}|(36|38)[0-9]{12})$/;


    this.className = "";
    if (patrones.get(this.id).test(this.value)) {
        this.className = "verde";
    }

} 

// Ejecución de la aplicación
    window.addEventListener('load', function(){
    let nombre = document.getElementById('nombre');
    let apellidos = document.getElementById('apellidos');
    let email = document.getElementById('email');

    nombre.addEventListener('keyup', validarDatos);
    apellidos.addEventListener('keyup', validarDatos);
    email.addEventListener('keyup', validarDatos);
    
});