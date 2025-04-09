<?php
header('Content-Type: application/json');
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$itemName = $data['itemName'];
$quantity = $data['quantity'];
$price = $data['price'];

$stmt = $pdo->prepare("INSERT INTO items (name, quantity, price) VALUES (?, ?, ?)");
$stmt->execute([$itemName, $quantity, $price]);

echo json_encode(['success' => true]);
?>