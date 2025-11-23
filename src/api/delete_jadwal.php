<?php
include "config.php";

$id = $_POST['id'] ?? 0;
$stmt = $conn->prepare("DELETE FROM tb_jadwal WHERE id_jadwal = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
