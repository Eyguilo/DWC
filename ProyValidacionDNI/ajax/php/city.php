<?php
header("access-control-allow-origin: *");
ini_set('html_errors', 1);
ini_set('display_errors', 1);

$conexion = mysqli_connect('localhost', 'root', '1234');
mysqli_select_db($conexion, 'world');
$consulta = mysqli_prepare($conexion, "SELECT city.Name FROM city;");
$consulta->execute();
$result = $consulta->get_result();

$arrayNombres = array();
while ($myrow = $result->fetch_assoc()) {
    array_push($arrayNombres, $myrow);
}

$nombre = $_REQUEST["nombre"];
//$nombre = "as";
$pista = "";

if ($nombre !== "") {
    $nombre = strtolower($nombre);
    $long = strlen($nombre);
    foreach ($arrayNombres as $a) {
        if (stristr($nombre, substr($a['Name'], 0, $long))) {
            if ($pista === "") {
                $pista = $a['Name'];
            } else {
                $pista .= "," . $a['Name'];
            }
        }
    }
}

echo $pista === "" ? "No hay sugerencias encontradas." : $pista;