const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/hotels-controller').init(data);

    router
        .get('/allhotels', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/hotel/create', (req, res) => {
            return controller.getCreateForm(req, res);
        })
        .get('/hotel/:id', (req, res) => {
            return controller.getHotelDetails(req, res);
        })
        .get('/hotel/:id/gallery', (req, res) => {
            return controller.getHotelGallery(req, res);
        })
        .get('/hotel/:id/add', (req, res) => {
            return controller.getAddForm(req, res);
        })
        .get('/hotel/:id/update', (req, res) => {
            return controller.getUpdateForm(req, res);
        })
        .post('/hotel/create', (req, res) => {
            return controller.createHotel(req, res);
        })
        .post('/hotel/:id/update', (req, res) => {
            return controller.update(req, res);
        })
        .post('/hotel/:id/add', (req, res) => {
            return controller.add(req, res);
        });


    app.use(router);
};

module.exports = { attachTo };
