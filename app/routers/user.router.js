const { Router } = require('express');
const passport = require('passport');
const auth = require('../middleware/auth.middleware');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/users-controller').init(data);
    const loginFirstErr = 'Страницата е достъпна след login';
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
                return controller.getAdminPanel(req, res);
            }
            return controller.getUserProfile(req, res);
        })
        .get('/login', (req, res) => {
            return controller.getSignInForm(req, res);
        })
        .get('/loginerror', (req, res) => {
            return controller.getSignInForm(req, res, invalidCredentialsErr);
        })
        .get('/users/order', (req, res) => {
            if (!req.isAuthenticated()) {
                return controller.getSignInForm(req, res, loginFirstErr);
            }
            return controller.getAddForm(req, res);
        })
        .get('/error', (req, res) => {
            return controller.showError(req, res);
        })
        .get('/users', (req, res) => {
            if (!req.isAuthenticated()) {
                return controller.getSignInForm(req, res, loginFirstErr);
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
        .post('/users', (req, res) => {
            if (!req.isAuthenticated()) {
                return controller.getSignInForm(req, res);
            }
            if (req.body._method) {
                return controller.update(req, res);
            }
            return controller.addItem(req, res);
        })
        .put('/users', (req, res) => {
            if (!req.isAuthenticated()) {
                return controller.getSignInForm(req, res);
            }
            return controller.update(req, res);
        });

    app.use(router);
};

module.exports = { attachTo };
