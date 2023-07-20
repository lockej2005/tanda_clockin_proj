<?php
$database = 'shifts.db';

$conn = new SQLite3($database);
if (!$conn) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to connect to SQLite database']);
  exit();
}

$query = "SELECT date, clock_in, clock_out, price FROM shifts ORDER BY date DESC";
$result = $conn->query($query);
if (!$result) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to fetch shifts data from database']);
  exit();
}

$shifts = [];
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
  $shifts[] = $row;
}

http_response_code(200);
echo json_encode(['shifts' => $shifts]);

unset($conn);
?>
