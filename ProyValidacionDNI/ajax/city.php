<?php
    function obtain(){
        $conexion = mysqli_connect('localhost', 'root','1234');
        mysqli_select_db($conexion, 'world');
        $consulta = mysqli_prepare($conexion, "SELECT * FROM city;");
    }