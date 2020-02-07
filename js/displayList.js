var displayList = {
    totalDisplays: 0,

    build: function() {
        var parent = this;

        parent.reset();

        $.ajax({
            dataType: 'json',
            url: '/api/displays/get/',
            success: function(result) {
                parent.render(result);
            }
        });
    },

    init: function() {
        var parent = this;

        $('.add-display').on('click', function(e) {
            e.preventDefault();
            var displayName = window.prompt('Display name');
            parent.add(displayName);
        });

        $('.remove-display').on('click', function(e) {
            e.preventDefault();
            var displayId = $(this).parent().data('id');
            parent.remove(displayId);
        });
    },

    show: function() {
        $('.display-list').show();
    },

    hide: function() {
        $('.display-list').hide();
    },

    add: function(name) {
        var parent = this;

        $.ajax({
            dataType: 'json',
            data: {
                name: name
            },
            url: '/api/displays/add/',
            success: function(result) {
                parent.build();
            }
        });
    },

    remove: function(id) {
        var parent = this;

        $.ajax({
            dataType: 'json',
            data: {
                id: id
            },
            url: '/api/displays/remove/',
            success: function(result) {
                parent.build();
            }
        })
    },

    render: function(displays) {
        var parent = this;

        for (displayId in displays) {
            var display = displays[displayId];

            var item = '<a href="#'+displayId+'" class="display-list-item" data-id="'+displayId+'">';
            item += '<span class="display-list-item-image"';

            if (display.image) {
                item += ' style="background-image: url('+display.image.url+')"';
            }

            item += '>';
            item += '</span>';

            item += '<span class="display-list-item-name">';
            item += display.name;
            item += '</span>';

            item += '<span class="remove-display"></span>'

            item += '</a>';

            $('.display-list').append(item);
        }

        // Total displays
        var totalDisplays = $('.display-list-item').length;
        $('.display-list').removeClass('displays-'+parent.totalDisplays);
        $('.display-list').addClass('displays-'+totalDisplays);

        if (totalDisplays > 6) {
            $('.display-list').addClass('many-displays');
        } else {
            $('.display-list').removeClass('many-displays');
        }

        parent.totalDisplays = totalDisplays;

        // Add display button
        $('.display-list').append('<button class="add-display"><span class="add-display-text">Add Display</span></button>');
        
        // Drop to list
        $('.display-list-item').on('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();

            // Get display ID
            var displayId = $(this).data('id');

            // Get dropped file
            var file = e.originalEvent.dataTransfer.files;

            // Upload image
            upload.uploadImage(file, displayId);
        });

        $('.display-list-item').on('dragenter', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).addClass('dropping');
        });

        $('.display-list-item').on('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).addClass('dropping');
        });

        $('.display-list-item').on('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).removeClass('dropping');
        });

        parent.show();
        parent.init();
    },

    empty: function() {
        $('.display-list-item').remove();
        $('.add-display').remove();
        $('.display-list').hide();
    },

    reset: function() {
        var parent = this;
        parent.empty();
        display.reset();
    }
};
