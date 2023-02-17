<?php
header("access-control-allow-origin: *");
ini_set('html_errors', 1);
ini_set('display_errors', 1);

$nombre = $_REQUEST["nombre"];
$pista = "";

$conexion = mysqli_connect('localhost', 'root', '1234');
mysqli_select_db($conexion, 'world');
$consulta = mysqli_prepare($conexion, "SELECT country.Name FROM country WHERE country.Name LIKE '".$nombre."%' ORDER BY country.Name ASC;");
$consulta->execute();
$result = $consulta->get_result();

$arrayNombres = array();
while ($myrow = $result->fetch_assoc()) {
    array_push($arrayNombres, $myrow);
}
$estructura = "";
foreach($arrayNombres as $nom){
    if($estructura == ""){
        $estructura .= $nom['Name'];
    }else{
        $estructura .= ", ".$nom['Name'];
    }
}
echo $estructura;