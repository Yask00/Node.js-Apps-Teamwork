const { Router } = require('express');
const { checker } = require('../utils/authCheck');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/services.controller').init(data);

    router
        .get('/allservices', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/services', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.getCreateForm(req, res);
            }
        })
        .get('/services/update', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.getUpdateForm(req, res);
            }
        })
        .get('/services/:id/details', (req, res) => {
            return controller.getDetails(req, res);
        })
        .post('/services', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.createService(req, res);
            }
        })
        .put('/services/:id', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.update(req, res);
            }
        });

    app.use(router);
};

module.exports = { attachTo };