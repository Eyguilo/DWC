const registroPacientes = new Map([
    [`AAA024`, `Fernández M. (321790059) -> C/Recoletos, 50`],  
    [`BCD827`, `Ruíz P. (100973253) -> C/Esquerdo izquierdo, 103`],
    [`YUN835`,`Benítez E. (154811767) -> Av.Argentina, 5`]
]);


const registroPacientesV2 = new Map();
let datos = new Array();
let contArrayX = 0;
let contArrayY = 0;
let cont = 1;

registroPacientes.forEach((value, key) => {


    let  nombreCompleto = value.split(' (',1);
    let valueFinal = "nombreRegistro"
    registroPacientesV2.set(`Paciente ${cont}`, valueFinal);
    cont++;
});

console.log(registroPacientesV2);

let foo = registroPacientes.split[0][0](' ');
console.log(foo);