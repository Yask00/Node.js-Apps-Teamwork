/* globals __dirname */

const session = require('express-session');
const passport = require('passport');

const LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo')(session);

const config = require('../../config'); // PORT ConnectionString, Secret

const applyTo = (app, data) => {
    passport.use(new LocalStrategy((username, password, done) => {
        // strategy goes here
    }));

    app.use(session({
        store: new MongoStore({ url: config.connectionString }),
        secret: config.secret,
        resave: true,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.findById(id)
            .then((user) => {
                done(null, user);
            }).catch(done);
    });

    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };

        next();
    });
};

module.exports = { applyTo };
