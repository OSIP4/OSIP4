<?php
include "config.php";

$result = $conn->query("SELECT * FROM tb_jadwal ORDER BY Tanggal ASC");
$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);
?>
