<?php

// Send headers
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-Type: application/json');

require_once('../../../config.php');
require_once(PATH.'/lib/displays.php');

$displays = new Display\Displays;

// Remove display
if (isset($_REQUEST['id']) && $_REQUEST['id']) {
    if ($displays->removeDisplay($_REQUEST['id'])) {
        echo json_encode(['ok' => 1]);
        exit;
    }
}

echo json_encode(['error' => 1]);
exit;
