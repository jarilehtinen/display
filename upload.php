<?php

// Send headers
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-Type: application/json');

// Allowed mime types
$mime_types = [
    'image/png' => 'png',
    'image/jpeg' => 'jpg',
    'image/gif' => 'gif',
    'image/svg+xml' => 'svg'
];

// Check if user uploaded a file
if (!isset($_FILES['file']['tmp_name'])) {
    json_encode(['error' => 'no-file']);
    exit;
}

// Get uploaded file path
$uploaded_file = $_FILES['file']['tmp_name'];

// Get uploaded file's mime type
$mime_type = mime_content_type($uploaded_file);

// Check if mime type is allowed
if (!in_array($mime_type, array_keys($mime_types))) {
    echo json_encode(['error' => 'image-not-supported']);
    exit;
}

// Check for file dimensions
$is_svg = $mime_type == 'image/svg+xml' ? true : false;

if (!$is_svg && !is_array(getimagesize($uploaded_file))) {
    echo json_encode(['error' => 'could-not-get-size']);
    exit;
}

// Move uploaded file
$filename = 'images/image.'.$mime_types[$mime_type];

if (move_uploaded_file($_FILES['file']['tmp_name'], $filename)) {
    echo json_encode(['ok' => 1]);
    exit;
}

// Could not save image
echo json_encode(['error' => 'could-not-save-image']);
exit;
