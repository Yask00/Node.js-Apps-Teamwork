const BaseData = require('./base/base');
const Static = require('../models/static');
const { ObjectID } = require('mongodb');

class HotelData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }

    removeFromCollection(body, collection) {
        body._id = new ObjectID(body._id);
        console.log(body._id);

        const collections = {
            'rooms': { rooms: { _id: body._id } },
            'services': { services: { _id: body._id } },
            'comments': { comments: { _id: body._id } },
            'likes': { likes: { _id: body._id } },
        };
        const params = collections[collection];
        return this.collection.update({ _id: new ObjectID(body.hotelId) }, {
            $pull: params,
        });
    }

    updateCollection(body, collection) {
        const dbModel = this.getDbModel(body);
        console.log(dbModel);
        return this.removeFromCollection(dbModel, collection)
            .then(() => {
                return this.addToCollection(dbModel, collection);
            });
    }

    addToCollection(body, collection) {
        if (Static.isValid(body, this.validator)) {
            const collections = {
                'rooms': { rooms: body },
                'services': { services: body },
                'comments': { comments: body },
                'likes': { likes: body },
            };
            const params = collections[collection];
            return this.collection.update(
                { _id: new ObjectID(body.hotelId) },
                { $push: params });
        }
        return Promise.reject('Добавянето е неуспешно!');
    }

    update(id, body) {
        const dbModel = this.getDbModel(body);
        return this.collection.update(
            { _id: new ObjectID(id) },
            { $set: dbModel });
    }
}

const init = (db, Model, validator) => {
    return new HotelData(db, Model, validator);
};

module.exports = { init };
