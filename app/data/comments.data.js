const BaseData = require('./base/base');
// const Static = require('../models/static');
// const { ObjectID } = require('mongodb');

class CommentsData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }
}

const init = (db, Model, validator) => {
    return new CommentsData(db, Model, validator);
};

module.exports = { init };
