<?php
header("access-control-allow-origin: *");
ini_set('html_errors', 1);
ini_set('display_errors', 1);

$nombre = $_REQUEST["nombre"];
$pista = "";

$conexion = mysqli_connect('localhost', 'root', '1234');
mysqli_select_db($conexion, 'world');
$consulta = mysqli_prepare($conexion, "SELECT country.Name FROM country;");
$consulta->execute();
$result = $consulta->get_result();

$arrayNombres = array();
while ($myrow = $result->fetch_assoc()) {
    array_push($arrayNombres, $myrow);
}

$estructura = "<option disabled selected></option>";
$cont = 1;
foreach($arrayNombres as $nom){
    $estructura .="<option value='".$cont."'>".$nom['Name']."</option>";
    $cont++;
}
echo $estructura;