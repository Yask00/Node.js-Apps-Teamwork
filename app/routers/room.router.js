const { Router } = require('express');
const { checker } = require('../utils/authCheck');


const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/rooms.controller').init(data);

    router
        .get('/allrooms', (req, res) => {
            return controller.getAllRooms(req, res);
        })
        .get('/rooms', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.getCreateForm(req, res);
            }
        })
        .get('/rooms/:id/details', (req, res) => {
            return controller.getRoomDetails(req, res);
        })
        .get('/rooms/update', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.getUpdateForm(req, res);
            }
        })
        .post('/rooms', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.createRoom(req, res);
            }
        })
        .put('/rooms/:id', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.update(req, res);
            }
        });

    app.use(router);
};

module.exports = { attachTo };