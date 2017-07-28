const BaseData = require('./base/base');
const Static = require('../models/static');
const { ObjectID } = require('mongodb');

class OrderData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }

    // updateCollection(model) {
    //     return this.collection.update(
        // { _id: new ObjectID(model.hotelId) }, { $push: { hotels: model } });
    // }

    remove(id) {
        return this.collection.remove( { '_id': ObjectID(id) } );
    }
}

const init = (db, Model, validator) => {
    return new OrderData(db, Model, validator);
};

module.exports = { init };
