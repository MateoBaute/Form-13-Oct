<?php
header("Content-Type: application/json");

// Conexión a la base de datos
$mysqli = new mysqli("localhost", "root", "", "pre-inscripción");

if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión a la base de datos"]);
    exit();
}

// Verifica que se use POST para insertar datos
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido. Use POST"]);
    exit();
}

// Validar que todos los campos requeridos estén presentes en $_POST
$camposRequeridos = ['Nombre_Completo', 'Edad', 'Teléfono', 'Cédula'];
foreach ($camposRequeridos as $campo) {
    if (!isset($_POST[$campo]) || empty(trim($_POST[$campo]))) {
        http_response_code(400);
        echo json_encode(["error" => "Campo requerido faltante: " . $campo]);
        exit();
    }
}

// Sanitizar los datos de entrada
$nombreCompleto = trim($_POST['Nombre_Completo']);
$edad = intval($_POST['Edad']);
$telefono = trim($_POST['Teléfono']);
$cedula = trim($_POST['Cédula']);

// Validaciones adicionales
if ($edad <= 0 || $edad > 150) {
    http_response_code(400);
    echo json_encode(["error" => "Edad no válida"]);
    exit();
}

// Preparar la consulta INSERT con parámetros para prevenir inyección SQL
$sql = "INSERT INTO `inscripto` (`Nombre_Completo`, `Edad`, `Teléfono`, `Cédula`) 
        VALUES (?, ?, ?, ?)";
        

$stmt = $mysqli->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Error al preparar la consulta: " . $mysqli->error]);
    exit();
}

// Vincular parámetros (s = string, i = integer)
$stmt->bind_param("siss", $nombreCompleto, $edad, $telefono, $cedula);

// Ejecutar la consulta
if ($stmt->execute()) {
    // Éxito al insertar
    window.location.href = "https://www.google.com";
} else {
    // Error al insertar
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Error al insertar registro: " . $stmt->error
    ]);
}

// Cerrar statement y conexión
$stmt->close();
$mysqli->close();
?>