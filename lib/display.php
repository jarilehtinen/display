<?php

namespace Display;

class Display
{
    public function getImage($display_id)
    {
        // File list
        $files = [
            '../../../images/'.$display_id.'.jpg',
            '../../../images/'.$display_id.'.png',
            '../../../images/'.$display_id.'.gif',
            '../../../images/'.$display_id.'.svg'
        ];

        // Get image
        foreach ($files as $file) {
            if (file_exists($file)) {
                // Get file modification time
                $modified_time = filemtime($file);

                // Remove relative path
                $file = str_replace('../', '', $file);

                return [
                    'url' => '/'.$file.'?v='.$modified_time,
                    'modified' => $modified_time
                ];
            }
        }
    }

    public function removeImages($display_id) {
        $files = [
            '../../../images/'.$display_id.'.jpg',
            '../../../images/'.$display_id.'.png',
            '../../../images/'.$display_id.'.gif',
            '../../../images/'.$display_id.'.svg'
        ];

        // Get image
        foreach ($files as $file) {
            if (file_exists($file)) {
                unlink($file);
            }
        }
    }
}
