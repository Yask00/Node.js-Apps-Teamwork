class OrdersController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        this.data.orders.getAll()
            .then((orders) => {
                res.render('order/all', {
                    context: orders,
                    user: req.user,
                });
            })
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getBookingForm(req, res) {
        this.data.hotels.getAll()
            .then((hotels) => {
                return res.render('order/booking', {
                    user: req.user,
                    hotels,
                });
            });
    }

    getExactBookingForm(req, res) {
        this.data.rooms.getById(req.params.roomId)
            .then((room) => {
                return res.render('order/booking', {
                    user: req.user,
                    room,
                });
            });
    }

    createBooking(req, res) {
        let dbOrder;
        const body = req.body;
        const hotel = JSON.parse(req.body.hotel);
        const room = hotel.rooms.find((r) => r._id === body.roomId);
        room.roomStatus = 'booked';
        const service = hotel.services.find((s) => s._id === body.serviceId);
        const price = body.price.replace(/\./g, ',');
        const model = {
            hotelName: hotel.name,
            nightsCount: body.nightsCount,
            room: room,
            price: price,
            paymentType: body.paymentType,
            serviceType: service.serviceType,
            username: req.user.username,
            userId: req.user._id.toString(),
        };
        return this.data.orders.create(model)
            .then((order) => {
                dbOrder = order.ops[0];
                return this.data.users.addToCollection(dbOrder, 'rooms');
            }).then(() => {
                return this.data.rooms.update(dbOrder.room._id, room);
            }).then(() => {
                return this.data.hotels.updateCollection(dbOrder.room, 'rooms');
            }).then((result) => {
                req.flash('Order success',
                    `Успешно резервирахте стая ${dbOrder.room.roomType} в хотел ${dbOrder.hotelName}`);
                res.render('home/index', {
                    message: req.flash('Order success'),
                    user: req.user,
                });
            })
            .catch((err) => {
                console.log(err);
                req.flash('Failed creation',
                    'Записът e неуспешен поради невалидни данни!');
                res.render('home/index', {
                    message: req.flash('Failed creation'),
                    user: req.user,
                });
            });
    }

    getOrderDetails(req, res) {
        this.data.orders.getById(req.params.id)
            .then((dbOrder) =>
                res.render('order/details', {
                    order: dbOrder,
                    user: req.user,
                }))
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    removeOrder(req, res) {
        this.data.orders.remove(req.params.id)
            .then((removedOrder) => {
                req.flash('Order removed succesfuly',
                    `Тази поръчка беше успешно премахната!`);
                res.render('home/index', {
                    user: req.user,
                    order: removedOrder,
                    message: req.flash('Order removed succesfuly'),
                });
            })
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }
}

const init = (data) => {
    return new OrdersController(data);
};

module.exports = { init };