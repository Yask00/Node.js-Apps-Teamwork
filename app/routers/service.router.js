const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/services.controller').init(data);

    router
        .get('/services', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/services/form', (req, res) => {
            return controller.getCreateForm(req, res);
        })
        .get('/services/:id', (req, res) => {
            return controller.getUpdateForm(req, res);
        })
        .get('/services/:id/details', (req, res) => {
            return controller.getDetails(req, res);
        })
        .put('/services', (req, res) => {
            return controller.update(req, res);
        })
        .post('/services', (req, res) => {
            if (req.body._method) {
                return controller.update(req, res);
            }
            return controller.createService(req, res);
        });

    app.use(router);
};

module.exports = { attachTo };
