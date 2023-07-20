<?php
$database = 'shifts.db';

$conn = new SQLite3($database);
if (!$conn) {
  die('Failed to connect to SQLite database');
}

$requestPayload = file_get_contents('php://input');
$shiftData = json_decode($requestPayload, true);

$query = "INSERT INTO shifts (date, clock_in, clock_out, price) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($query);

if (!$stmt) {
  die('Prepare failed: ' . $conn->lastErrorMsg());
}

$stmt->bindValue(1, $shiftData['date']);
$stmt->bindValue(2, $shiftData['clock_in']);
$stmt->bindValue(3, $shiftData['clock_out']);
$stmt->bindValue(4, $shiftData['price']);

if ($stmt->execute()) {
  http_response_code(200);
  echo 'Shift data saved successfully!';
} else {
  http_response_code(500);
  echo 'Failed to save shift data.';
}

unset($conn);
?>
