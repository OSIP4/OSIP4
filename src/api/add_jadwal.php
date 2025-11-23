<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "config.php";

$Hari = $_POST['Hari'] ?? '';
$Tanggal = $_POST['Tanggal'] ?? '';
$Kelas = $_POST['Kelas'] ?? '';

$stmt = $conn->prepare("INSERT INTO tb_jadwal (Hari, Tanggal, Kelas) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $Hari, $Tanggal, $Kelas);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
