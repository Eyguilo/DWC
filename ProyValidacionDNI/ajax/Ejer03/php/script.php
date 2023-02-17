<?php
header("access-control-allow-origin: *");
ini_set('html_errors', 1);
ini_set('display_errors', 1);

$nombrePais = $_REQUEST['nombre'];

if ($nombrePais == 'null') {
    $conexion = mysqli_connect('localhost', 'root', '1234');
    mysqli_select_db($conexion, 'world');
    $consulta = mysqli_prepare($conexion, "SELECT country.Name FROM country ORDER BY country.Name ASC;");
    $consulta->execute();
    $result = $consulta->get_result();

    $arrayNombres = array();
    while ($myrow = $result->fetch_assoc()) {
        array_push($arrayNombres, $myrow);
    }
    $estructura = "";
    foreach ($arrayNombres as $nom) {
        if ($estructura == "") {
            $estructura .= $nom['Name'];
        } else {
            $estructura .= ", " . $nom['Name'];
        }
    }
    echo $estructura;
} else {
    $conexion = mysqli_connect('localhost', 'root', '1234');
    mysqli_select_db($conexion, 'world');
    $consulta = mysqli_prepare($conexion, "SELECT city.Name, city.District, city.Population FROM city INNER JOIN country 
    ON city.CountryCode = country.Code WHERE country.Name = '" . $nombrePais . "' ORDER BY city.Name ASC;");
    $consulta->execute();
    $result = $consulta->get_result();

    $arrayNombres = array();
    while ($myrow = $result->fetch_assoc()) {
        array_push($arrayNombres, $myrow);
    }
    $estructura = "";
    foreach ($arrayNombres as $nom) {
        if ($estructura == "") {
            $estructura .= $nom['city.Name'].", ".$nom['city.District'].", ".$nom['city.Population'].";<br>";
        } else {
            $estructura .= ", " . $nom['city.Name'].", ".$nom['city.District'].", ".$nom['city.Population'].";<br>";
        }
    }
    echo $estructura;
}