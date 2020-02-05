var displayList = {
    show: function() {
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
                parent.show();
            }
        });
    },

    render: function(displays) {
        var parent = this;

        for (displayId in displays) {
            var display = displays[displayId];

            var item = '<a href="#'+displayId+'" class="display-list-item">';
            item += '<span class="display-list-item-image"';

            if (display.image) {
                item += ' style="background-image: url('+display.image.url+')"';
            }

            item += '>';
            item += '</span>';

            item += '<span class="display-list-item-name">';
            item += display.name;
            item += '</span>';

            item += '</a>';

            $('.display-list').append(item);
        }

        $('.display-list').append('<button class="add-display"><span>Add Display</span></button>');
        
        $('.display-list').show();

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
