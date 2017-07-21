'use strict';

const hashing = require('../../utils/hashing');
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
        return new Promise((res, rej) => {
            this.collection
                .find(filter, options)
                .then((result) => res(result.toArray()));
        });
    }

    getById(id) {
        const _id = (new ObjectID(id));
        return this.collection.findOne({ _id: _id });
    }

    create(model) {
        if (Static.isValid(model, this.validator)) {
            return this.collection.insert(model);
        } else {
            return Promise.reject('Model validation failed!');
        }
    }
}

module.exports = BaseData;
