'use strict';

(function getAction() {
    $('#update-form').submit((event) => {
        const id = $('#roomId').val();
        const url = '/rooms/' + id;
        const options = {};
        options.data = {
            roomType: $('#roomType').val(),
            imageURL: $('#imageURL').val(),
            description: $('#description').val(),
            price: $('#price').val(),
            roomStatus: $('#roomStatus').val(),
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