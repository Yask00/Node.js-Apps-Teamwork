const { Router } = require('express');


const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/rooms.controller').init(data);

    router
        .get('/allrooms', (req, res) => {
            return controller.getAllRooms(req, res);
        })
        .get('/rooms', (req, res) => {
            return controller.getCreateForm(req, res);
        })
        .get('/rooms/:id/details', (req, res) => {
            return controller.getRoomDetails(req, res);
        })
        .get('/rooms/:id', (req, res) => {
            return controller.getUpdateForm(req, res);
        })
        .post('/rooms', (req, res) => {
            if (req.body._method) {
                return controller.update(req, res);
            }
            return controller.createRoom(req, res);
        })
        .put('/rooms', (req, res) => {
            return controller.update(req, res);
        });

    app.use(router);
};

module.exports = { attachTo };
