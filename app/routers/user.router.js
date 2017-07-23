const { Router } = require('express');
const passport = require('passport');
const auth = require('../middleware/auth.middleware');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/users-controller').init(data);
    const loginFirsErr = 'Страницата е достъпна след login';
    const invalidCredentialsErr = 'Невалидни username/password';

    router
        .get('/register', (req, res) => {
            return controller.getSignUpForm(req, res);
        })
        .get('/profile', (req, res) => {
            if (!req.isAuthenticated()) {
                return controller.getSignInForm(req, res);
            }
            if (auth.isInRole(req, 'admin')) {
                return controller.getUpdateForm(req, res);
            }
            return controller.getUserProfile(req, res);
        })
        .get('/login', (req, res) => {
            return controller.getSignInForm(req, res);
        })
        .get('/loginerror', (req, res) => {
            return controller.getSignInForm(req, res, invalidCredentialsErr);
        })
        .get('/add', (req, res) => {
            if (!req.isAuthenticated()) {
                return controller.getSignInForm(req, res, loginFirsErr);
            }
            return controller.getAddForm(req, res);
        })
        .get('/error', (req, res) => {
            return controller.showError(req, res);
        })
        .get('/update', (req, res) => {
            if (!req.isAuthenticated()) {
                return controller.getSignInForm(req, res, loginFirsErr);
            }
            return controller.getUpdateForm(req, res);
        })
        .get('/logout', (req, res) => {
            return controller.signOut(req, res);
        })
        .post('/register', (req, res) => {
            return controller.signUp(req, res);
        })
        .post('/login', passport.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/loginerror',
            failureFlash: true,
        }))
        .post('/updateuser', (req, res) => {
            if (!req.isAuthenticated()) {
                return controller.getSignInForm(req, res);
            }
            return controller.update(req, res);
        })
        .post('/add', (req, res) => {
            if (!req.isAuthenticated()) {
                return controller.getSignInForm(req, res);
            }
            return controller.add(req, res);
        });

    app.use(router);
};

module.exports = { attachTo };