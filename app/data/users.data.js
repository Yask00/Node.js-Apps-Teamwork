const hashing = require('../utils/hashing');
const BaseData = require('./base/base');

class UserData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByUsername(username) {
        return new Promise((res, rej) => {
            return this.collection.findOne({ username: username })
                .then((result) => {
                    if (result) {
                        res(result);
                    } else {
                        rej('Invalid username passed!');
                    }
                });
        });
    }

    checkPassword(username, password) {
        return new Promise((res, rej) => {
            this.getByUsername(username)
                .then((resultUser) => {
                    if (!resultUser) {
                        rej('Invalid user');
                    }
                    const salt = resultUser.salt;
                    const passHash = hashing.hashPassword(salt, password);
                    if (resultUser.password !== passHash) {
                        rej('Invalid password');
                    }
                    res(true);
                });
        });
    }

    getByEmail(email) {
        return new Promise((res, rej) => {
            return this.collection.findOne({ email: email })
                .then((result) => {
                    if (result) {
                        res(result);
                    } else {
                        rej('Invalid email passed!');
                    }
                });
        });
    }
}

const init = (db, Model, validator) => {
    return new UserData(db, Model, validator);
};

module.exports = { init };
