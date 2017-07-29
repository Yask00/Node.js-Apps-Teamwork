'use strict';

(function getAction() {
    $('#update-form').submit((event) => {
        const id = $('#regionId').val();
        const url = '/regions/' + id;
        const options = {};
        options.data = {
            imageURL: $('#imageURL').val(),
            description: $('#description').val(),
        }
        requester.put(url, options).then((result) => {
            $('body').html(result);
        });
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
    })
}());