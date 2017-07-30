'use strict';

(function getAction() {
    $('#hotel-update-form').submit((event) => {
        const id = $('#hotelId').val();
        const url = '/hotels/' + id;
        const options = {};
        options.data = {
            name: $('#name').val(),
            phone: $('#phone').val(),
            imageURL: $('#imageURL').val(),
            description: $('#description').val(),
        }
        if ($('#single')) {
            options.data.single = true;
        }
        requester.put(url, options).then((result) => {
            $('body').html(result);
        });
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
    })
}());