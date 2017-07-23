const { Router } = require('express');


const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/hotels-controller').init(data);
    const errmsg = 'Записът неуспешен поради невалидни данни!';

    router
        .get('/allhotels', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/hotel/gallery/:id', (req, res) => {
            return controller.getHotelGallery(req, res);
        })
        .get('/hotel/create', (req, res) => {
            return controller.getCreateForm(req, res);
        })
        .get('/hotel/addform/:id', (req, res) => {
            return controller.getAddForm(req, res);
        })
        .get('/hotel/updateformerr/:id', (req, res) => {
            return controller.getUpdateForm(req, res, errmsg);
        })
        .get('/hotel/updateform/:id', (req, res) => {
            return controller.getUpdateForm(req, res);
        })
        .get('/hotel/:id', (req, res) => {
            return controller.getHotelDetails(req, res);
        })
        .post('/hotel/update', (req, res) => {
            return controller.update(req, res);
        })
        .post('/hotel/create', (req, res) => {
            return controller.createHotel(req, res);
        })
        .post('/hotel/add', (req, res) => {
            return controller.add(req, res);
        });


    app.use(router);
};

module.exports = { attachTo };