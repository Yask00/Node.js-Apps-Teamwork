const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/hotels.controller').init(data);

    router
        .get('/allhotels', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/hotels/:id/details', (req, res) => {
            return controller.getHotelDetails(req, res);
        })
        .get('/hotels/:id/gallery', (req, res) => {
            return controller.getHotelGallery(req, res);
        })
        .get('/hotels/:id', (req, res) => {
            return controller.getUpdateForm(req, res);
        })
        .get('/hotels', (req, res) => {
            return controller.getCreateForm(req, res);
        })
        .post('/hotels', (req, res) => {
            if (req.body._method) {
                return controller.update(req, res);
            }
            return controller.createHotel(req, res);
        })
        .put('/hotels', (req, res) => {
            return controller.update(req, res);
        });


    app.use(router);
};

module.exports = { attachTo };
