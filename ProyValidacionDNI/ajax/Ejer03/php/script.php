<?php
header("access-control-allow-origin: *");
ini_set('html_errors', 1);
ini_set('display_errors', 1);

$nomPais = $_REQUEST['nomPais'];
$nomCiutat = $_REQUEST['nomCiutat'];

if ($nomPais == 'null' && $nomCiutat == 'null') {
    $connexio = mysqli_connect('localhost', 'root', '1234');
    mysqli_select_db($connexio, 'world');
    $consulta = mysqli_prepare($connexio, "SELECT country.Name FROM country ORDER BY country.Name ASC;");
    $consulta->execute();
    $result = $consulta->get_result();

    $arrayNoms = array();
    while ($myrow = $result->fetch_assoc()) {
        array_push($arrayNoms, $myrow);
    }
    $estructura = "";
    foreach ($arrayNoms as $nom) {
        if ($estructura == "") {
            $estructura .= $nom['Name'];
        } else {
            $estructura .= ", " . $nom['Name'];
        }
    }
    echo $estructura;

} else if ($nomPais != 'null' && $nomCiutat == 'null') {
    $connexio = mysqli_connect('localhost', 'root', '1234');
    mysqli_select_db($connexio, 'world');
    $consulta = mysqli_prepare($connexio, "SELECT city.Name, city.ID FROM city INNER JOIN country 
    ON city.CountryCode = country.Code WHERE country.Name = '" . $nomPais . "' ORDER BY city.Name ASC;");
    $consulta->execute();
    $result = $consulta->get_result();

    $arrayNoms = array();
    while ($myrow = $result->fetch_row()) {
        array_push($arrayNoms, $myrow);
    }
    $estructura = "";
    foreach ($arrayNoms as $nom) {
        if ($estructura == "") {
            $estructura = $nom[0] . ", " . $nom[1] . ";";
        } else {
            $estructura .= $nom[0] . ", " . $nom[1] . ";";
        }
    }
    echo $estructura;

} else if ($nomPais == 'null' && $nomCiutat != 'null') {
    $connexio = mysqli_connect('localhost', 'root', '1234');
    mysqli_select_db($connexio, 'world');
    $consulta = mysqli_prepare($connexio, "SELECT city.Name, city.District, city.Population 
    FROM city WHERE city.ID = '" . $nomCiutat . "' ORDER BY city.Name ASC;");
    $consulta->execute();
    $result = $consulta->get_result();

    $arrayCiutat = array();
    while ($myrow = $result->fetch_row()) {
        array_push($arrayCiutat, $myrow);
    }
    $estructura = "";
    $estructura = $arrayCiutat[0][0]. ", " . $arrayCiutat[0][1]. ", " . $arrayCiutat[0][2];

    echo $estructura;
}