const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/orders-controller').init(data);

    router
        .get('/orders', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/orders/booking', (req, res) => {
            return controller.getBookingForm(req, res);
        })
        .post('/orders/booking', (req, res) => {
            return controller.createBooking(req, res);
        })
        .get('/orders/:id', (req, res) => {
            return controller.getOrderDetails(req, res);
        })
        // .get('/orders/service', (req, res) => {
        //     return controller.getCreateForm(req, res);
        // })
        // .post('/orders/servive', (req, res) => {
        //     if (req.body._method) {
        //         return controller.update(req, res);
        //     }
        //     return controller.createHotel(req, res);
        // })
        ;

    app.use(router);
};

module.exports = { attachTo };