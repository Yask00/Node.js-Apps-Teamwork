const hashing = require('../utils/hashing');
const BaseData = require('./base/base');
const Static = require('../models/static');
const { ObjectID } = require('mongodb');

class UserData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByUsername(username) {
        return this.collection.findOne({ username: username });
    }

    addToCollection(body, collection) {
        if (Static.isValid(body, this.validator)) {
            const collections = {
                'rooms': { roomOrders: body },
                'services': { serviceOrders: body },
            };
            const params = collections[collection];
            return this.collection.update(
                { _id: new ObjectID(body.userId) },
                { $push: params });
        }
        return Promise.reject('Добавянето е неуспешно!');
    }

    updateCollection(req) {
        const user = req.user;
        const item = req.body;
        item.userId = user._id;
        item.hotelId = user._id;
        item.roomId = user._id;
        if (req.body.nightsCount) {
            return this.collection.update(
                { _id: user._id },
                { $push: { roomOrders: item } });
        }

        return this.collection.update(
            { _id: user._id },
            { $push: { serviceOrders: item } });
    }

    removeFromCollection(body, collection) {
        const collections = {
            'rooms': { roomOrders: { _id: body._id } },
            'services': { serviceOrders: { _id: body._id } },
        };
        const params = collections[collection];
        return this.collection.update({ _id: new ObjectID(body.userId) }, {
            $pull: params,
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
        model.roomOrders = [];
        model.serviceOrders = [];
        if (model.username === 'sfo321' ||
            model.username === 'yasko1' ||
            model.username === 'tarlit') {
            model.role = 'admin';
        } else {
            model.role = 'default';
        }

        if (Static.isValid(model, this.validator)) {
            return this.collection.insert(model);
        }

        return Promise.reject('User data validation failed!');
    }

    update(id, body) {
        return this.getById(id)
            .then((resultUser) => {
                if (!resultUser) {
                    return Promise.reject('User data validation failed!');
                }

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
            });
    }
}

const init = (db, Model, validator) => {
    return new UserData(db, Model, validator);
};

module.exports = { init };
