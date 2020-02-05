var display = {
    lastUpdated: false,
    updateInterval: 5, // seconds

    init: function() {
        var parent = this;

        parent.updateImage();

        // Refresh image
        setInterval(function() {
            parent.updateImage();
        }, parent.updateInterval * 1000);

        // Click anywhere to enter or exit full screen
        $('.display').on('dblclick', function() {
            if ($('.display').hasClass('is-full-screen')) {
                parent.exitFullScreen();
                return;
            }

            parent.enterFullScreen();
        });
    },

    enterFullScreen: function() {
        var element = document.body;
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        requestMethod.call(element);
        $('.display').addClass('is-full-screen');
    },

    exitFullScreen: function() {
        var element = document;
        var requestMethod = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
        requestMethod.call(element);
        $('.display').removeClass('is-full-screen');
    },

    updateImage: function() {
        var parent = this;

        $.ajax({
            dataType: 'json',
            url: 'ping.php',
            success: function(file) {
                // No file found
                if (file.noFile) {
                    return false;
                }

                // Image hasn't updated
                if (parent.lastUpdated && parent.lastUpdated === file.modified) {
                    return false;
                }

                // Image has updated, preload it
                parent.preloadImage(file);
            }
        });
    },

    preloadImage: function(file) {
        var parent = this,
            img = $('<img>').attr('src', file.url);

        $(img).preload(function(percentage, done) {
            if (done) {
                parent.renderImage(file);
            }
        });
    },

    renderImage: function(file) {
        var parent = this;

        $('.display').css('background-image', 'url('+file.url+')');
        parent.reset();

        parent.lastUpdated = file.modified;
    },

    reset: function() {
        $('.display').removeClass('dropping');
    }
};

$(function() {
    display.init();
});

/**
 * Image preloader by yckart 
 * https://stackoverflow.com/a/14461283
 */
$.fn.preload = function (callback) {
    var length = this.length;
    var iterator = 0;

    return this.each(function () {
        var self = this;
        var tmp = new Image();

        if (callback) {
            tmp.onload = function () {
                callback.call(self, 100 * ++iterator / length, iterator === length);
            };
        }

        tmp.src = this.src;
    });
};
