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
        let result = this.collection
            .find(filter, options)
            .toArray();

        if (this.Model.toViewModel) {
            result = result.then((models) => {
                return models
                    .map((model) =>
                        this.Model.toViewModel(model));
            });
        }
        return result;
    }

    getById(id) {
        const action = this.collection.findOne({ _id: new ObjectID(id) });
        try {
            return action()
                .then((result) => {
                    if (!result) {
                        return null;
                    }
                    return result;
                });
        } catch (err) {
            return Promise.reject('Invalid id');
        }
    }

    create(model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Invalid model');
        }

        return this.collection.insert(model)
            .then(() => {
                return this.Model.toViewModel(model);
            });
    }
}

module.exports = BaseData;