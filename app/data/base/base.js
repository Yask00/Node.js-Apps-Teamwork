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
        return new Promise((res, rej) => {
            return this.collection.findOne({ _id: _id })
                .then((result) => {
                    if (result) {
                        res(result);
                    } else {
                        rej('Invalid id passed!');
                    }
                });
        });
    }

    create(model) {
        return new Promise((res, rej) => {
            if (Static.isValid(model, this.validator)) {
                return this.collection.insert(model)
                    .then((dbModel) => {
                        res(dbModel);
                    });
            } else {
                rej('Model data validation failed!');
            }
        });
    }
};

module.exports = BaseData;