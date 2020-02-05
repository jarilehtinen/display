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

        // Drop indicator
        $('.display').on('dragenter', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.display').addClass('dropping');
        });

        $('.display').on('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.display').addClass('dropping');
        });

        $('.display').on('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.display').removeClass('dropping');
        });

        // Drop image event
        $('.display').on('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();

            // Get dropped file
            var file = e.originalEvent.dataTransfer.files;

            // Upload image
            parent.uploadImage(file);
        });
    },

    uploadImage: function(file) {
        // Create form data
        var formData = new FormData();
        formData.append('file', file[0]);
        formData.append('id', display.getDisplayId());

        $.ajax({
            url: '/api/upload/',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(result) {
                if (result.ok) {
                    display.updateImage();
                    return;
                }
            },
            error: function(result) {
                $('.display').removeClass('dropping');
            }
        });
    }
};

$(function() {
    upload.init();
});
