var upload = {
    init: function() {
        var parent = this;

        // Prevent redirecting
        $('html').on('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        $('html').on('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
    },

    initDisplayUpload: function() {
        var parent = this;

        // Drop indicator
        $('.on-display').on('dragenter', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.display').addClass('dropping');
        });

        $('.on-display').on('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.display').addClass('dropping');
        });

        $('.on-display').on('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.display').removeClass('dropping');
        });

        // Drop image event
        $('.on-display').on('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();

            // Get dropped file
            var file = e.originalEvent.dataTransfer.files;

            // Upload image
            parent.uploadImage(file);
        });
    },

    uploadImage: function(file, displayId) {
        if (!displayId) {
            displayId = display.getDisplayId();
        }

        if (!displayId) {
            return false;
        }

        // Create form data
        var formData = new FormData();
        formData.append('file', file[0]);
        formData.append('id', displayId);

        $.ajax({
            url: '/api/upload/',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(result) {
                if (result.ok) {
                    $('.dropping').removeClass('dropping');

                    if (display.getDisplayId()) {
                        display.updateImage();
                    } else {
                        displayList.build();    
                    }

                    return;
                }
            },
            error: function(result) {
                $('.dropping').removeClass('dropping');
            }
        });
    }
};

$(function() {
    upload.init();
});
