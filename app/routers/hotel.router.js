const { Router } = require('express');


const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/hotels-controller').init(data);

    router
        .get('/all', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/hotel/:id', (req, res) => {
            return controller.getHotelDetails(req, res);
        })
        .get('/hotel/:id/gallery', (req, res) => {
            return controller.getHotelGallery(req, res);
        });
    // .post('/logout', (req, res) => {
    //     return controller.signOut(req, res);
    // })
    // .post('/register', (req, res) => {
    //     return controller.signUp(req, res);
    // })
    // .post('/login', passport.authenticate('local', {
    //     successRedirect: '/profile',
    //     failureRedirect: '/login',
    //     failureFlash: true,
    // }));

    app.use(router);
};

module.exports = { attachTo };
