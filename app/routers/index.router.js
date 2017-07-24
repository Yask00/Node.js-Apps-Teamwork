const { Router } = require('express');


const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/index-controller').init(data);

    router
        .get('/', (req, res) => {
            return controller.getIndexPage(req, res);
        });

    app.use(router);
};

module.exports = { attachTo };
