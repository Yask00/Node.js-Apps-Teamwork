const { Router } = require('express');


const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/rooms-controller').init(data);

    router
        .get('/allrooms', (req, res) => {
                return controller.getAllRooms(req, res);
            })
        .get('/room/create', (req, res) => {
            return controller.getCreateForm(req, res);
        })
        .get('/room/:id', (req, res) => {
            return controller.getRoomDetails(req, res);
        })
        .get('/room/:id/add', (req, res) => {
            return controller.getAddForm(req, res);
        })
        .get('/room/:id/update', (req, res) => {
            return controller.getUpdateForm(req, res);
        })
        .post('/room/create', (req, res) => {
            return controller.createRoom(req, res);
        })
        .post('/room/:id/update', (req, res) => {
            return controller.update(req, res);
        });

    app.use(router);
};

module.exports = { attachTo };
