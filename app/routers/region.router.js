const { Router } = require('express');
const { checker } = require('../utils/authCheck');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/regions.controller').init(data);

    router
        .get('/allregions', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/regions', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.getCreateForm(req, res);
            }
        })
        .get('/regions/:id/details', (req, res) => {
            return controller.getRegionDetails(req, res);
        })
        .get('/regions/:id/review', (req, res) => {
            return controller.getRegionReview(req, res);
        })
        .get('/regions/update', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.getUpdateForm(req, res);
            }
        })
        .post('/regions', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.createRegion(req, res);
            }
        })
        .put('/regions/:id', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.update(req, res);
            }
        });

    app.use(router);
};

module.exports = { attachTo };