# Display Image On Any Screen

What's the easiest way to display an image on a screen? This is. Just drag an image to the display you want it to appear. Supports multiple displays.

## How to use

1. Install on any PHP enabled server
2. Open index.html
3. Click Add Display and give it a name
4. Upload an image by dragging it on the display list (or on the opened display)
5. Double-click anywhere to go full screen

Fox maximum user experience, open index.html on another display. It syncs the image automagically.

Supports JPEG, PNG, GIF and SVG.

## Installation

Create ```/config.php``` file containing:

```php
<?php

define('PATH', '/path/in/your/server');
```

## Requirements

- PHP
- Browser with JavaScript enabled

## Notice

Please, use at your own risk.

## Changelog

**0.0.1**

- First version

**0.0.2**

- Removed debug code

**0.0.3**

- Moved files around
- Entering full screen mode now requires double-click

**0.0.4**

- Added image preloader

**0.0.5**

- Added support for multiple displays

**0.0.6**

- Added sample configuration file

**0.0.7**

- Improved responsiveness on display list view

**0.0.8**

- Fixed broken full screen view. Huh.

**0.0.9**

- Some more responsiveness fixing. Details matter, eh?

**0.1.0**

- Oh, forgot about the 200 px wide screens. Umm... Right.

## Thanks

- Icons from Entypo http://entypo.com