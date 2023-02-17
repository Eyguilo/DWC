function showHint() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {

        let form = document.getElementById('form1');
        let label = document.createElement('label');
        label.textContent = 'Tria un país:';
        let br = document.createElement('br');
        form.innerHTML = '';
        form.appendChild(label);
        form.appendChild(br);

        let sel = document.createElement('select');
        sel.setAttribute('onchange', datosCiudad());
        sel.setAttribute('name', this.value);
        form.appendChild(sel);

        let arrayPaises = this.responseText.split(', ');
        console.log(arrayPaises);

        let opt = document.createElement('option');
        opt.textContent = '';
        sel.appendChild(opt);

        arrayPaises.forEach(nombre => {
            let opt = document.createElement('option');
            opt.textContent = nombre;
            opt.setAttribute('value', nombre);
            sel.appendChild(opt);
        });
    }
    xmlhttp.open("GET", "php/script.php?nombre=null");
    xmlhttp.send();
}

function datosCiudad(ciudad) {

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {

    let form = document.getElementById('form2');
    let label = document.createElement('label');
    label.textContent = 'Tria una ciutat:';
    let br = document.createElement('br');
    form.innerHTML = '';
    form.appendChild(label);
    form.appendChild(br);

    let sel = document.createElement('select');
    form.appendChild(sel);

    let arrayCiudades = this.responseText.split(';');
    console.log(arrayCiudades);

    let opt = document.createElement('option');
    opt.textContent = '';
    sel.appendChild(opt);

    arrayCiudades.forEach(nombre => {
        console.log(nombre);
        let opt = document.createElement('option');
        opt.textContent = nombre;
        opt.setAttribute('value', nombre);
        sel.appendChild(opt);
    });
    }

    xmlhttp.open("GET", "php/script.php?nombre=" + ciudad);
    xmlhttp.send();
}