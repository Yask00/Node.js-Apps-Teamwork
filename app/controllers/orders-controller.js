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

    createBooking(req, res) {
        return this.data.orders.create(req.body)
            .then((dbOrder) => {
                req.flash('Room order created succesfuly',
                    `Вашата поръчка беше успешна!`);
                res.render('order/booking', {
                    message: req.flash('Room order created succesfuly'),
                });
            }).catch((err) => {
                req.flash('Failed creation',
                    'Записът e неуспешен поради невалидни данни!');
                res.render('order/booking', {
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

}

const init = (data) => {
    return new OrdersController(data);
};

module.exports = { init };