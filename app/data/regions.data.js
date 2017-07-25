const BaseData = require('./base/base');
const { ObjectID } = require('mongodb');
// const Static = require('../models/static');

class RegionData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }

    updateCollection(model) {
        return this.collection.update({ _id: new ObjectID(model.regionId) }, { $push: { hotels: model } });
    }

    // create(model) {
    //     model.hotels = [];

    //     if (Static.isValid(model, this.validator)) {
    //         return this.collection.insert(model);
    //     }

    //     return Promise.reject('Region data validation failed!');
    // }
}

const init = (db, Model, validator) => {
    return new RegionData(db, Model, validator);
};

module.exports = { init };