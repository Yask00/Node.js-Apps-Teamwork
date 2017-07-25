// const hashing = require('../../utils/hashing');
const Static = require('../../models/static');
const { ObjectID } = require('mongodb');

class BaseData {
    constructor(db, Model, validator) {
        this.db = db;
        this.Model = Model;
        this.validator = validator;
        this.collectionName = this.Model.name.toLowerCase() + 's';
        this.collection = this.db.collection(this.collectionName);
    }

    getAll(filter, options) {
        filter = filter || {};
        options = options || {};
        return this.collection.find(filter, options).toArray();
    }

    getById(id) {
        const _id = (new ObjectID(id));
        return this.collection.findOne({ _id: _id });
    }

    create(model) {
        if (!Static.isValid(model, this.validator)) {
            return Promise.reject('Model validation failed!');
        }

        return this.collection.insert(model);
    }
}

module.exports = BaseData;
