<?php

namespace Display;

class Display
{
    private $image_types = [
        'jpg',
        'png',
        'gif',
        'svg'
    ];

    public function getImage($display_id)
    {
        // Get image
        foreach ($this->image_types as $image_type) {
            $file = PATH.'/images/'.$display_id.'.'.$image_type;

            if (file_exists($file)) {
                // Get file modification time
                $modified_time = filemtime($file);

                // Remove relative path
                $file = str_replace(PATH, '', $file);

                return [
                    'url' => $file.'?v='.$modified_time,
                    'modified' => $modified_time
                ];
            }
        }
    }
}
