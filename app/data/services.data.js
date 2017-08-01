const BaseData = require('./base/base');
const Static = require('../models/static');
const { ObjectID } = require('mongodb');

class ServiceData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }

    update(id, body) {
        const dbModel = this.getDbModel(body);
        return this.collection.update(
            { _id: new ObjectID(id) },
            { $set: dbModel });
    }
}

const init = (db, Model, validator) => {
    return new ServiceData(db, Model, validator);
};

module.exports = { init };
