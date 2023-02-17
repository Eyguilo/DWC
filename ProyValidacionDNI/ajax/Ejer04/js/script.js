function nomPaisos() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {

        let form = document.getElementById('form1');
        let label = document.getElementsByTagName('label')[0];
        form.appendChild(label);
        let br = document.createElement('br');
        form.appendChild(br);

        let sel = document.getElementById("idPais");
        form.appendChild(sel);

        let arrayPaisos = JSON.parse(this.responseText);

        let opt = document.createElement('option');
        opt.textContent = 'Elegeix un país';
        opt.selected = true;
        opt.disabled = true;
        sel.appendChild(opt);

        for (let i = 0; i < arrayPaisos.length; i++) {
            let opt = document.createElement('option');
            opt.textContent = arrayPaisos[i]['Name'];
            opt.setAttribute('value', arrayPaisos[i]['Name']);
            sel.appendChild(opt);

        }
    }
    xmlhttp.open("GET", "php/script.php?nomPais=null&nomCiutat=null", true);
    xmlhttp.send();
}

function dadesCiutat(pais) {

    pais = this.value;

    let sel = document.getElementById('idCiutat');
    sel.innerHTML = "";

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {

        let arrayCiutats = "";
        arrayCiutats = JSON.parse(this.responseText);

        let opt = document.createElement('option');
        opt.textContent = 'Elegeix un ciutat:';
        opt.selected = true;
        opt.disabled = true;
        sel.appendChild(opt);

        for (let i = 0; i < arrayCiutats.length; i++) {
            let opt = document.createElement('option');
            opt.textContent = arrayCiutats[i]['Name'];
            opt.setAttribute('value', arrayCiutats[i]['ID']);
            sel.appendChild(opt);
        }
    }
    xmlhttp.open("GET", "php/script.php?nomPais=" + pais + "&nomCiutat=null", true);
    xmlhttp.send();
}

function dadesDistricte(ciutatCodi) {

    ciutatCodi = this.value;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {

        let ciutatDades = JSON.parse(this.responseText);

        let div = document.getElementById('informacio');
        div.innerHTML = "";
        let h2 = document.createElement('h2');
        let p1 = document.createElement('p');
        p1.innerHTML = "Districte: <strong>" + ciutatDades[0]['District'] + "</strong>";
        let p2 = document.createElement('p');
        p2.innerHTML = "Districte: <strong>" + ciutatDades[0]['Population'] + "</strong>";
        h2.textContent = ciutatDades[0]['Name'];
        div.appendChild(h2);
        div.appendChild(p1);
        div.appendChild(p2);
    }

    xmlhttp.open("GET", "php/script.php?nomPais=null&nomCiutat=" + ciutatCodi, true);
    xmlhttp.send();
}

window.onload = function () {
    let country = document.getElementById('idPais');
    country.addEventListener('change', dadesCiutat);

    let ciutat = document.getElementById('idCiutat');
    ciutat.addEventListener('change', dadesDistricte);

    nomPaisos();
}