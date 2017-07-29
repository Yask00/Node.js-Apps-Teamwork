'use strict';

(function getAction() {
    $('#update-form').submit((event) => {
        const id = $('#serviceId').val();
        const url = '/services/' + id;
        const options = {};
        options.data = {
            serviceType: $('#serviceType').val(),
            imageURL: $('#imageURL').val(),
            description: $('#description').val(),
            price: $('#price').val(),
        }
        requester.put(url, options).then((result) => {
            $('body').html(result);
        });
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
    })
}());