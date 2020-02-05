<?php

// Send headers
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-Type: application/json');

require_once('../../../lib/displays.php');
require_once('../../../lib/display.php');

$displays = new Display\Displays;
$display = new Display\Display;

// Get displays
if ($all_displays = $displays->getDisplays()) {
    // Add image to each display
    $all_displays = json_decode($all_displays, true);
    
    $new_displays = [];

    foreach ($all_displays as $display_id => $display_name) {
        $new_displays[$display_id] = [
            'name' => $display_name,
            'image' => $display->getImage($display_id)
        ];
    }

    echo json_encode($new_displays);
    exit;
}

echo json_encode(['noDisplays' => 1]);
exit;
