var fullscreen = {
    init: function() {
        var parent = this;

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
    }
};

$(function() {
    fullscreen.init();
});