<?php
// Get the request payload (shifts data)
$requestPayload = file_get_contents('php://input');

// Load existing data from shifts.json file
$existingData = file_get_contents('shifts.json');

// Decode existing data into a PHP array
$existingArray = json_decode($existingData, true);

// Decode the new data
$newData = json_decode($requestPayload, true);

// Add the new data to the existing array
$existingArray['shifts'][] = $newData;

// Convert the updated array back to JSON
$combinedData = json_encode($existingArray, JSON_PRETTY_PRINT);

// Save the combined data to shifts.json file
file_put_contents('shifts.json', $combinedData);

// Send a response indicating success
http_response_code(200);
echo 'Shifts data saved successfully!';
?>
