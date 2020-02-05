<?php

// Send headers
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-Type: application/json');

// Supported files
$files = [
    'images/image.jpg',
    'images/image.png',
    'images/image.gif',
    'images/image.svg'
];

// Collect file modification times
$modified = [];

foreach ($files as $file) {
    if (file_exists($file)) {
        $modified[$file] = filemtime($file);
    }
}

// Check if we got modification times
if (is_array($modified) && count($modified) > 0) {
    // Sort by modified file time
    arsort($modified);

    // Modification time of newest file
    $modified_time = $modified[key($modified)];

    // Output file URL and modification time
    echo json_encode([
        'url' => key($modified).'?v='.$modified_time,
        'modified' => $modified_time
    ]);

    exit;
}

// No image file found
echo json_encode(['noFile' => 1]);
exit;
