const hashing = require('../utils/hashing');
const BaseData = require('./base/base');
const Static = require('../models/static');

class UserData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByUsername(username) {
        return this.collection.findOne({ username: username });
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
        return this.collection.findOne({ email: email });
    }

    create(model) {
        const salt = hashing.generateSalt();
        const passHash = hashing.hashPassword(salt, model.password);
        model.password = passHash;
        model.salt = salt;
        model.role = 'default';
        model.roomOrders = [];
        model.serviceOrders = [];
        console.log(model);
        if (Static.isValid(model, this.validator)) {
            return this.collection.insert(model);
        } else {
            return Promise.reject('User data validation failed!');
        }
    }

}

const init = (db, Model, validator) => {
    return new UserData(db, Model, validator);
};

module.exports = { init };
