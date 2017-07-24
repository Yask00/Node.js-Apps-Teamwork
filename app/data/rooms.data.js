const BaseData = require('./base/base');
const Static = require('../models/static');
const { ObjectID } = require('mongodb');

class RoomsData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }
}

const init = (db, Model, validator) => {
    return new RoomsData(db, Model, validator);
};

module.exports = { init };
