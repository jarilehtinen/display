var display = {
    lastUpdated: false,
    updateInterval: 5, // seconds,
    displayId: false,

    init: function() {
        var parent = this;

        parent.initDisplay();

        $(window).on('hashchange', function() {
            parent.initDisplay();
        });
    },

    getDisplayId: function() {
        return window.location.hash.replace('#', '');
    },

    initDisplay: function() {
        var parent = this;

        parent.lastUpdated = false;
        parent.reset();

        if (parent.getDisplayId()) {
            displayList.hide();
            parent.updateImage();
            parent.initImageUpdater();
            return;
        }

        displayList.show();
    },

    initImageUpdater: function() {
        var parent = this;

        // Refresh image
        setInterval(function() {
            parent.updateImage();
        }, parent.updateInterval * 1000);
    },

    setDefaultImage: function() {
        $('.display').css('background-image', 'url(/default.svg)');
    },

    updateImage: function() {
        var parent = this;

        $.ajax({
            dataType: 'json',
            data: {
                id: parent.getDisplayId()
            },
            url: '/api/display/get/',
            success: function(file) {
                // No file found
                if (file.noFile) {
                    parent.setDefaultImage();
                    return false;
                }

                // Image hasn't updated
                if (parent.lastUpdated && parent.lastUpdated === file.modified) {
                    return false;
                }

                // Image has updated, preload it
                parent.preload(file);
            }
        });
    },

    preload: function(file) {
        var parent = this,
            img = $('<img>').attr('src', file.url);

        $(img).preload(function(percentage, done) {
            if (done) {
                parent.render(file);
            }
        });
    },

    render: function(file) {
        var parent = this;

        $('.display').css('background-image', 'url('+file.url+')');
        $('.display').removeClass('dropping');

        parent.lastUpdated = file.modified;
    },

    remove: function() {
        $('.display').css('background-image', 'none');
    },

    reset: function() {
        var parent = this;
        parent.remove();
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
