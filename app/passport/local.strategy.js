'use strict';

const LocalStrategy = require('passport-local');
const hashing = require('../utils/hashing');

function comparePassword(requestPassword, user) {
    return hashing.hashPassword(user.salt, requestPassword) === user.password;
}

module.exports = (passport, data) => {
    const authStrategy = new LocalStrategy((username, password, done) => {
        data.users.getByUsername(username).then((user) => {
            if (user && comparePassword(password, user)) {
                done(null, user);
            } else {
                done(null, false);
            }
        }).catch((error) => {
            return done(error, false);
        });
    });

    passport.use(authStrategy);
};
