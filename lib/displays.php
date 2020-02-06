<?php

namespace Display;

class Displays
{
    private $displays;
    private $config;

    private $image_types = [
        'jpg',
        'png',
        'gif',
        'svg'
    ];

    /**
     * Get config path
     */
    private function getConfigPath()
    {
        // Use config path resolver so we don't have to use a global config file
        $config_path = PATH.'/config.json';

        if (file_exists($config_path)) {
            return $config_path;
        }

        $config_path = PATH.'/config.json';
        
        if (file_exists($config_path)) {
            return $config_path;
        }
        
        return false;
    }

    /**
     * Read config
     */
    private function readConfig()
    {
        $config_path = $this->getConfigPath();

        if (!$config_path) {
            return false;
        }

        $this->config = file_get_contents($config_path);
        $this->displays = json_decode($this->config, true);
    }

    /**
     * Update config
     */
    private function updateConfig()
    {
        $config_path = $this->getConfigPath();

        if (!$config_path) {
            return false;
        }

        $this->config = json_encode($this->displays);
        return file_put_contents($config_path, $this->config);
    }

    /**
     * Get displays
     */
    public function getDisplays()
    {
        $this->readConfig();
        return $this->config;
    }

    /**
     * Display exists
     */
    public function displayExists($id)
    {
        $this->getDisplays();

        if (isset($this->displays[$id])) {
            return true;
        }

        return false;
    }

    /**
     * Add display
     */
    public function addDisplay($display_name)
    {
        if (!$display_name) {
            return false;
        }

        $this->getDisplays();

        $id = $this->slug($display_name);
        $this->displays[$id] = $display_name;
        
        natsort($this->displays);

        $this->updateConfig();

        return $id;
    }

    /**
     * Remove display
     */
    public function removeDisplay($display_id)
    {
        if (!$this->displayExists($display_id)) {
            return false;
        }

        $this->getDisplays();

        unset($this->displays[$display_id]);

        $this->updateConfig();

        $this->removeImages($display_id);

        return true;
    }

    /**
     * Remove images
     */
    public function removeImages($display_id)
    {
        // Get image
        foreach ($this->image_types as $image_type) {
            $file = PATH.'/images/'.$display_id.'.'.$image_type;

            if (file_exists($file)) {
                unlink($file);
            }
        }
    }

    /**
     * Slug
     */
    public static function slug($text)
    {
        // Replace non-letter or digits by -
        $slug = preg_replace('~[^\pL\d]+~u', '-', $text);

        // Transliterate
        $slug = iconv('utf-8', 'us-ascii//TRANSLIT', $slug);

        // Remove unwanted characters
        $slug = preg_replace('~[^-\w]+~', '', $slug);

        // Trim
        $slug = trim($slug, '-');

        // Remove duplicate -
        $slug = preg_replace('~-+~', '-', $slug);

        // Lowercase
        $slug = strtolower($slug);

        if (empty($slug)) {
            return 'n-a';
        }

        return $slug;
    }
}
