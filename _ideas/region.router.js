const { Router } = require('express');


const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/regions-controller').init(data);

    router
        .get('/', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/gallery', (req, res) => {
            return controller.getRegionsGallery(req, res);
        })
        .get('/:id', (req, res) => {
            return controller.getRegionDetails(req, res);
        })
        .get('/:id/gallery', (req, res) => {
            return controller.getOneRegionGallery(req, res);
        })
        .get('/create', (req, res) => {
            return controller.getCreateForm(req, res);
        })
        .post('/create', (req, res) => {
            return controller.createNewRegion(req, res);
        })
        .put('/update/:id', (req, res)=> {
            return controller.updateRegion(req, res);
        });

    app.use('/regions', router);
};

module.exports = { attachTo };
