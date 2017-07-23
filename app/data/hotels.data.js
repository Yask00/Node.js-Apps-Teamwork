const BaseData = require('./base/base');
const Static = require('../models/static');

class HotelData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getAll() {
        return this.collection.find().toArray();
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }

    updateCollection(hotel, params) {
        const collection = params.collection;
        const item = params.item;
        return this.collection.update(
            { _id: hotel._id }, { $push: { collection: item } });
    }

    create(model) {
        model.hotels = [];

        if (Static.isValid(model, this.validator)) {
            return this.collection.insert(model);
        }

        return Promise.reject('Hotel data validation failed!');
    }
}

const init = (db, Model, validator) => {
    return new HotelData(db, Model, validator);
};

module.exports = { init };
