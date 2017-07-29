const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/regions.controller').init(data);

    router
        .get('/allregions', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/regions', (req, res) => {
            return controller.getCreateForm(req, res);
        })
        .get('/regions/:id/details', (req, res) => {
            return controller.getRegionDetails(req, res);
        })
        .get('/regions/:id/review', (req, res) => {
            return controller.getRegionReview(req, res);
        })
        .get('/regions/:id', (req, res) => {
            return controller.getUpdateForm(req, res);
        })
        .get('/regionchoose', (req, res) => {
            return controller.getChooseForm(req, res);
        })
        .post('/regions', (req, res) => {
            if (req.body._method) {
                return controller.update(req, res);
            }
            return controller.createRegion(req, res);
        })
        .put('/regions', (req, res) => {
            return controller.update(req, res);
        });

    app.use(router);
};

module.exports = { attachTo };
