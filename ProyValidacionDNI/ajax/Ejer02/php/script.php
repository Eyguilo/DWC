<?php
header("access-control-allow-origin: *");
ini_set('html_errors', 1);
ini_set('display_errors', 1);

$conexion = mysqli_connect('localhost', 'root', '1234');
mysqli_select_db($conexion, 'world');
$consulta = mysqli_prepare($conexion, "SELECT city.Name FROM city ORDER BY city.Name ASC;");
$consulta->execute();
$result = $consulta->get_result();

$arrayNombres = array();
while ($myrow = $result->fetch_assoc()) {
    array_push($arrayNombres, $myrow);
}

$nombre = $_REQUEST["nombre"];
$pista = "";

if ($nombre !== "") {
    $nombre = strtolower($nombre);
    $long = strlen($nombre);
    $cont = 1;
    foreach ($arrayNombres as $a) {
        if (stristr($nombre, substr($a['Name'], 0, $long))) {
            if ($pista === "") {
                $pista = $cont . ".- " . $a['Name'];
            } else {
                $pista .= "<br>" . $cont . ".- " . $a['Name'];
            }
            $cont++;
        }
    }
}

echo $pista === "" ? "No hi ha suggerencies." : $pista;