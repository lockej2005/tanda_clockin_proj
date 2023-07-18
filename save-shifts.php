<?php
$requestPayload = file_get_contents('php://input');

$existingData = file_get_contents('shifts.json');

$existingArray = json_decode($existingData, true);

$newData = json_decode($requestPayload, true);

$existingArray['shifts'][] = $newData;

$combinedData = json_encode($existingArray, JSON_PRETTY_PRINT);

file_put_contents('shifts.json', $combinedData);

http_response_code(200);
echo 'Shifts data saved successfully!';
?>
