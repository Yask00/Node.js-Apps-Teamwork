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
        .post('/room/create', (req, res) => {
            return controller.createRoom(req, res);
        });
        // .post('/addroom', (req, res) => {
        //     return controller.addRoom(req, res);
        // });


    app.use(router);
};

module.exports = { attachTo };
