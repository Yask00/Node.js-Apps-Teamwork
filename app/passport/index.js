'use strict';

const passport = require('passport');

module.exports = (app, data) => {
    require('./local.strategy')(passport, data);

    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser((userId, done) => {
        data.users.getById(userId).then((user) => {
            return done(null, user || false);
        }).catch((error) => {
            return done(error, false);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());
};