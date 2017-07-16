/* globals __dirname */

const path = require('path');
const fs = require('fs');

const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local');
const data = require('./dummy-data'); // will use the real database later


module.exports = (app) => {
    // configure strategy for passport
    const strategy = new LocalStrategy((username, password, done) => {
        data.findUserByCredentials(username, password)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch((error) => done(error, null));
    });

    // tell passport to use the strategy
    passport.use(strategy);

    // tell passport how to serialize a user to store in a session
    // and how to deserialize a user from information serialized in a session
    passport.serializeUser((user, done) => {
        // minimalistic example - serialize the user id in the session
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser((id, done) => {
        // use the id serialized in the session to retrieve the use from the database
        data.findUserById(id)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch((error) => done(error, false));
    });
    // BodyParser Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(session({ secret: 'purple unicorn' })); // middleware that manages sessions

    // passport middleware
    app.use(passport.initialize());
    app.use(passport.session()); // passport session builds on top of express-session
};
