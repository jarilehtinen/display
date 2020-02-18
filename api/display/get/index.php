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
require_once('../../../loader.php');
require_once(PATH.'/lib/displays.php');
require_once(PATH.'/lib/display.php');

$display = new Display\Display;
$displays = new Display\Displays;

// Get display ID
$display_id = $_REQUEST['id'];

// Validate display ID
if (!$displays->displayExists($display_id)) {
    echo json_encode(['error' => 'invalid-id']);
    exit;
}

if ($image = $display->getImage($display_id)) {
    echo json_encode($image);
    exit;
}

// No image file found
echo json_encode(['noFile' => 1]);
exit;
