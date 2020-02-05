<?php

// Send headers
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-Type: application/json');

require_once('../../../lib/displays.php');

$displays = new Display\Displays;

if (!isset($_REQUEST['name'])) {
    echo json_encode(['error' => 'no-name-given']);
    exit;
}

// Add display
if ($id = $displays->addDisplay($_REQUEST['name'])) {
    echo json_encode(['ok' => 1, 'id' => $id]);
    exit;
}

echo json_encode(['error' => 1]);
exit;
