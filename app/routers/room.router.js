const { Router } = require('express');
const { checker } = require('../utils/authCheck');
const auth = require('../middleware/auth.middleware');


const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/rooms.controller').init(data);

    router
        .get('/rooms/all', (req, res) => {
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
        .get('/rooms/:id', (req, res) => {
            if (req.isAuthenticated() && auth.isInRole(req, 'admin')) {
                req.single = true;
                return controller.getUpdateForm(req, res);
            }
            if (req.isAuthenticated()) {
                return res.redirect(`/rooms/${req.params.id}/details`);
            }
            res.redirect(303, '/login');
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