const { Router } = require('express');
const { checker } = require('../utils/authCheck');
const auth = require('../middleware/auth.middleware');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/hotels.controller').init(data);

    router
        .get('/hotels/all', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/hotels/:id/details', (req, res) => {
            return controller.getHotelDetails(req, res);
        })
        .get('/hotels/:id/gallery', (req, res) => {
            return controller.getHotelGallery(req, res);
        })
        .get('/hotels/update', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.getUpdateForm(req, res);
            }
        })
        .get('/hotels', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.getCreateForm(req, res);
            }
        })
        .get('/hotels/:id', (req, res) => {
            if (req.isAuthenticated() && auth.isInRole(req, 'admin')) {
                req.single = true;
                return controller.getUpdateForm(req, res);
            }
            if (req.isAuthenticated()) {
                return res.redirect(`/hotels/${req.params.id}/details`);
            }
            res.redirect(303, '/login');
        })
        .post('/hotels', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.createHotel(req, res);
            }
        })
        .put('/hotels/:id', (req, res) => {
            if (checker.checkAll(req, res)) {
                return controller.update(req, res);
            }
        });


    app.use(router);
};

module.exports = { attachTo };