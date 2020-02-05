<?php

// Send headers
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-Type: application/json');

if (!isset($_REQUEST['id'])) {
    echo json_encode(['error' => 'no-id']);
    exit;
}

// Get displays class
require_once('../../lib/displays.php');
require_once('../../lib/display.php');

$displays = new Display\Displays;
$display = new Display\Display;

// Get display ID
$display_id = $_REQUEST['id'];

// Validate display ID
if (!$displays->displayExists($display_id)) {
    echo json_encode(['error' => 'invalid-id']);
    exit;
}

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
    echo json_encode(['error' => 'imageNotSupported']);
    exit;
}

// Check for file dimensions
$is_svg = $mime_type == 'image/svg+xml' ? true : false;

if (!$is_svg && !is_array(getimagesize($uploaded_file))) {
    echo json_encode(['error' => 'couldNotGetImageSize']);
    exit;
}

// Delete old files
$display->removeImages($display_id);

// Move uploaded file
$filename = '../../images/'.$display_id.'.'.$mime_types[$mime_type];

if (move_uploaded_file($uploaded_file, $filename)) {
    echo json_encode(['ok' => 1]);
    exit;
}

// Could not save image
echo json_encode(['error' => 'couldNotSaveImage']);
exit;
