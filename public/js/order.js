'use strict';

(function listen() {
    $(document).ready(() => {
        changeHotel();
        $('#totalPrice').append("Обща цена: 0лв.");
    });

    $('#hotel').change(() => {
        changeHotel();
    });

    $('#participants').on('input', () => {
        let value = $('#participants').val();
        if (!Number.isInteger(+value)) {
            $('#participants').val('0');
        } else {
            calculatePrice();
        }
    });

    $('#nightsCount').on('input', () => {
        let value = $('#nightsCount').val();
        if (!Number.isInteger(+value)) {
            $('#nightsCount').val('0');
        } else {
            calculatePrice();
        }
    });

    $('#roomId').change(() => {
        calculatePrice();
    });

    $('#serviceId').change(() => {
        calculatePrice();
    });
})();

function calculatePrice() {
    const nights = $('#nightsCount').val();
    const participants = $('#participants').val();
    $('#totalPrice').empty();
    const hotel = JSON.parse($('#hotel').val());
    const roomId = $('#roomId option:selected').val();
    const serviceId = $('#serviceId option:selected').val();
    const room = hotel.rooms.find(room => room._id === roomId);
    const service = hotel.services.find(service => service._id === serviceId);
    let totalRoomPrice = room.price.replace(/,/g, '.') * nights;
    let totalServicePrice = service.price.replace(/,/g, '.') * participants;
    let totalPrice = totalRoomPrice + totalServicePrice;
    totalPrice = totalPrice < 0 ? 0 : totalPrice;
    $('#totalPrice').append("Обща цена: " + totalPrice + "лв.");
    $('#price').val(totalPrice);
};

function changeHotel() {
    const hotel = JSON.parse($('#hotel').val());
    const rooms = hotel.rooms;
    const services = hotel.services;
    $('#roomId').html('');
    $.each(rooms, function(i, room) {
        $('#roomId').append($('<option>', {
            value: room._id,
            text: 'тип: ' + room.roomType + ', ' + 'цена: ' + room.price
        }));
    });
    $('#serviceId').html('');
    $.each(services, function(i, service) {
        $('#serviceId').append($('<option>', {
            value: service._id,
            text: 'тип: ' + service.serviceType + ', ' + 'цена: ' + service.price
        }));
    });
};