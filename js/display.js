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
                parent.renderImage(file);
            }
        });
    },

    renderImage: function(file) {
        var parent = this;

        if (file.noFile) {
            return false;
        }

        if (!parent.lastUpdated || parent.lastUpdated < file.modified) {
            $('.display').css('background-image', 'url('+file.url+')');
            $('.display').removeClass('dropping');
        }

        parent.lastUpdated = file.modified;
    },

    reset: function() {
        $('.display').removeClass('dropping');
    }
};

$(function() {
    display.init();
});