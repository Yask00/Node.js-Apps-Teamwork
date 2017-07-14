const controllers = require('../controllers');

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
    app.get('/login', controllers.users.login);
    // app.post('/login');
    // app.get('/logout);

    // anything else redirect to home page
    app.get('*', (req, res) => {
        res.redirect('/');
    });
};
