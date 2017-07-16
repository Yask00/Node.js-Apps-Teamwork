const controllers = require('../controllers');
const passport = require('passport');

module.exports = (app) => {
    // Main page
    app.get('/', controllers.index.indexPage);

    // All hotels by date added uptop
    app.get('/hotels', controllers.hotels.allHotels);

    // Single Hotel Details
    app.get('/hotel-details', controllers.hotels.hotelDetails);

    // Hotel Gallery
    app.get('/hotel-gallery', controllers.hotels.hotelGallery);

    // user registration
    app.get('/register', controllers.users.register);
    // app.post('/register');

    // user login and logout
    app.get('/login', controllers.users.getLogin);

    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/login' }),
        (req, res) => res.redirect('/profile'));

    // passport attaches an isAuthenticated function to each request
    app.get('/profile', (req, res) => {
        if (!req.isAuthenticated()) {
            return res.status(401).redirect('/login');
        }
        return res.status(200).send(
            `
                Welcome, ${req.user.username}
                <br>
                <a href="/logout">LOGOUT</a>
            `);
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.status(200).redirect('/login');
    });

    // anything else redirect to home page
    app.get('*', (req, res) => {
        res.redirect('/');
    });
};
