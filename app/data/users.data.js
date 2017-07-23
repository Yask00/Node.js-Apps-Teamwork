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

    updateCollection(req) {
        const user = req.user;
        const item = req.body;
        item.userId = user._id;
        item.hotelId = user._id;
        item.roomId = user._id;
        if (req.body.nightsCount) {
            return this.collection.update(
                { _id: user._id }, { $push: { roomOrders: item } });
        }

        return this.collection.update(
            { _id: user._id }, { $push: { serviceOrders: item } });
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
        if (Static.isValid(model, this.validator)) {
            return this.collection.insert(model);
        }

        return Promise.reject('User data validation failed!');
    }

    update(id, body) {
        return this.getById(id)
            .then((resultUser) => {
                if (resultUser) {
                    const salt = resultUser.salt;
                    const passHash = hashing.hashPassword(salt, body.password);
                    body.password = passHash;
                    return this.collection.update({ _id: resultUser._id }, {
                        $set: {
                            firstName: body.firstName,
                            lastName: body.lastName,
                            password: body.password,
                            phone: body.phone,
                        },
                    });
                }
            });
    }
}

const init = (db, Model, validator) => {
    return new UserData(db, Model, validator);
};

module.exports = { init };
