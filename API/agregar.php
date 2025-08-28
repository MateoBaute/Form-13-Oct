<?php
// Conexión a la base de datos
$mysqli = new mysqli("localhost", "root", "", "inscriptos");

if ($mysqli->connect_errno) {
    // Error de conexión - redirigir con parámetro de error
    header("Location: ../Index.html?error=conexion");
    exit();
}

// Verifica que se use POST para insertar datos
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../Index.html?error=metodo");
    exit();
}

// Sanitizar los datos de entrada
$nombreCompleto = trim($_POST['Nombre_Completo']);
$edad = intval($_POST['Edad']);
$telefono = trim($_POST['Teléfono']);
$cedula = trim($_POST['Cédula']);
$categoria = trim($_POST['Categoria'] ?? '');
$genero = trim($_POST['Genero'] ?? '');
$talla = trim($_POST['Talla'] ?? '');
$distancia = trim($_POST['Distancia'] ?? '');
$nmro_corredor = trim($_POST['inputNumero'] ?? ''); 

// Verificar si el deslinde fue confirmado (checkbox marcado)
$deslindeConfirmado = isset($_POST['confirmacionDeslinde']) && $_POST['confirmacionDeslinde'] === 'on';

// Validar que se haya confirmado el deslinde
if (!$deslindeConfirmado) {
    header("Location: ../Index.html?error=deslinde");
    exit();
}

// Validaciones adicionales
if ($edad <= 0 || $edad > 150) {
    header("Location: ../Index.html?error=edad");
    exit();
}

// Preparar la consulta INSERT con parámetros para prevenir inyección SQL
$sql = "INSERT INTO `inscripto` (`nombre_completo`, `edad`, `nmro_teléfono`, `cédula`, `categoría`, `género`, `talla`, `distancia`, `nmro_corredor`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $mysqli->prepare($sql);

if (!$stmt) {
    header("Location: ../Index.html?error=preparacion");
    exit();
}

// Vincular parámetros (s = string, i = integer)
// 9 parámetros: 8 strings y 1 integer (edad)
$stmt->bind_param("sissssssi", $nombreCompleto, $edad, $telefono, $cedula, $categoria, $genero, $talla, $distancia, $nmro_corredor);

// Ejecutar la consulta
if ($stmt->execute()) {
    // Éxito al insertar - redirigir con éxito
    header("Location: ../Index.html?success=true");
    exit();
} else {
    // Error al insertar
    header("Location: ../Index.html?error=insercion");
    exit();
}

// Cerrar statement y conexión
$stmt->close();
$mysqli->close();
?>