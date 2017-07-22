const BaseData = require('./base/base');
const Static = require('../models/static');

class RegionData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getAll() {
        return this.collection.find().toArray();
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }

    updateCollection(region, params) {
        const collection = params.collection;
        const item = params.item;
        return this.collection.update({ _id: region._id }, { $push: { collection: item } });
    }

    create(model) {
        model.hotels = [];

        if (Static.isValid(model, this.validator)) {
            return this.collection.insert(model);
        }

        return Promise.reject('Region data validation failed!');
    }
}

const init = (db, Model, validator) => {
    return new RegionData(db, Model, validator);
};

module.exports = { init };
