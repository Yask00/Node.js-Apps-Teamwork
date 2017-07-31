const BaseData = require('./base/base');
const { ObjectID } = require('mongodb');

class OrderData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }
}

const init = (db, Model, validator) => {
    return new OrderData(db, Model, validator);
};

module.exports = { init };