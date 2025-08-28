<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Conexión a la base de datos
$mysqli = new mysqli("localhost", "root", "", "inscriptos");

if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión a la base de datos"]);
    exit();
}

// Permitir tanto GET como POST
if (!in_array($_SERVER['REQUEST_METHOD'], ['GET', 'POST'])) {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit();
}

// Obtener parámetro de la solicitud (GET o POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Para solicitudes POST, leer el cuerpo de la solicitud
    $input = json_decode(file_get_contents('php://input'), true);
    $numero_corredor = isset($input['filtrarCorredor']) ? trim($input['filtrarCorredor']) : '';
} else {
    // Para solicitudes GET
    $numero_corredor = isset($_GET['filtrarCorredor']) ? trim($_GET['filtrarCorredor']) : '';
}

// Validar que sea un número si se proporciona
if ($numero_corredor !== '' && !is_numeric($numero_corredor)) {
    http_response_code(400);
    echo json_encode(["error" => "El número de corredor debe ser un valor numérico"]);
    exit();
}

// Consulta a la tabla inscripto
if ($numero_corredor !== '') {
    // Consulta con filtro
    $sql = "SELECT * FROM inscripto WHERE nmro_corredor = ?";
    $stmt = $mysqli->prepare($sql);
    
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(["error" => "Error al preparar la consulta: " . $mysqli->error]);
        exit();
    }
    
    // Convertir a entero y vincular parámetro
    $numero_filtrado = (int)$numero_corredor;
    $stmt->bind_param("i", $numero_filtrado);
    
    if (!$stmt->execute()) {
        http_response_code(500);
        echo json_encode(["error" => "Error al ejecutar la consulta: " . $stmt->error]);
        exit();
    }
    
    $resultado = $stmt->get_result();
} else {
    // Consulta sin filtro (todos los registros)
    $sql = "SELECT * FROM inscripto";
    $resultado = $mysqli->query($sql);
}

// Verificar si la consulta fue exitosa
if (!$resultado) {
    http_response_code(500);
    echo json_encode(["error" => "Error al realizar la consulta: " . $mysqli->error]);
    exit();
}

$datos = [];

while ($fila = $resultado->fetch_assoc()) {
    $datos[] = $fila;
}

// Devolver datos en JSON
echo json_encode($datos);

// Cerrar conexión
if (isset($stmt)) {
    $stmt->close();
}
$mysqli->close();
?>