/* globals __dirname */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const init = (data, config, db) => {
    const app = express();
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');
    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(config.secret));

    app.use('/public', express.static(path.join(__dirname, '../../public')));
    app.use(session({
        store: new MongoStore({ db }),
        secret: config.secret,
        resave: true,
        saveUninitialized: true,
        cookie: { httpOnly: true, maxAge: 60000000 },
    }));
    app.use(flash());

    require('../passport')(app, data);

    require('../routers').attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
