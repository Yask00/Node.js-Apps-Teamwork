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

    removeFromCollection(body) {
        return this.collection.update({}, {
            $pull: { rooms: { _id: body._id } },
        });
    }

    updateCollection(body, collection) {
        const dbModel = this.getDbModel(body);
        return this.removeFromCollection(dbModel)
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
            return this.collection.update({ _id: new ObjectID(body.hotelId) }, { $push: params });
        }
        return Promise.reject('Добавянето е неуспешно!');
    }

    update(body) {
        // let resultHotel;
        // return this.getById(body.hotelId)
        //     .then((result) => {
        //         if (!result) {
        //             return Promise.reject('Редактирането е неуспешно!');
        //         }
        //         resultHotel = result;
        //         const dbModel = this.getDbModel(body);
        //         return Promise.resolve(dbModel);
        //     }).then((dbModel) => {
        //         delete dbModel.hotelId;
        //         return this.collection.update(
        //            { _id: resultHotel._id }, { $set: dbModel });
        //     }).then(() => {
        //         return Promise.resolve(resultHotel._id);
        //     });
        let resultHotel;
        return this.getById(body.id)
            .then((result) => {
                resultHotel = result;
                const dbModel = this.getDbModel(body);
                return Promise.resolve(dbModel);
            }).then((dbModel) => {
                return this.collection.update(
                    { _id: resultHotel._id },
                    { $set: dbModel });
            });
    }
}

const init = (db, Model, validator) => {
    return new HotelData(db, Model, validator);
};

module.exports = { init };