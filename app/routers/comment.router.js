const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/comments-controller').init(data);

    router
        .get('/allcomments', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/comments', (req, res) => {
            return controller.getCreateForm(req, res);
        })
        .post('/comments', (req, res) => {
            if (req.body._method) {
                return controller.update(req, res);
            }
            return controller.createComment(req, res);
        });

    app.use(router);
};

module.exports = { attachTo };
