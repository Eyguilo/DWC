const registroPacientes = new Map([
    [`AAA024`, `Fernández M. (321790059) -> C/Recoletos, 50`],  
    [`BCD827`, `Ruíz P. (100973253) -> C/Esquerdo izquierdo, 103`],
    [`YUN835`,`Benítez E. (154811767) -> Av.Argentina, 5`]
]);


const registroPacientesV2 = new Map();
let cont = 1;
registroPacientes.forEach((value, key) => {

    let numeroRegistro= key;
    let nombreCompleto = value.split(' ',2);
    let numeroSS1 = value.split(')',1);
    let valueFinal = "\nnumeroRegistro: " + numeroRegistro +
    " \nnombreRegistro " + nombreCompleto + "\nnumeroSS: " + numeroSS1;
    registroPacientesV2.set(`Paciente ${cont}`, valueFinal);
    cont++;
});

console.log(registroPacientesV2);