const auth = require('../middleware/auth.middleware');

const showError = (req, res) => {
    req.flash('Not auth',
        'NOT AUTHORISED!!!');
    res.render('user/error', {
        message: req.flash('Not auth'),
        user: req.user,
    });
};

const checker = {
    checkAll(req, res, controller) {
        if (!req.isAuthenticated()) {
            res.redirect(303, '/login');
            return false;
        }
        if (!auth.isInRole(req, 'admin')) {
            showError(req, res);
            return false;
        }
        return true;
    },

    checkRole(req, res, controller) {
        if (!auth.isInRole(req, 'admin')) {
            showError(req, res);
            return false;
        }
        return true;
    },

    checkAuth(req, res, controller) {
        if (!req.isAuthenticated()) {
            res.redirect(303, '/login');
            return false;
        }
        return true;
    },
};

module.exports = { checker };