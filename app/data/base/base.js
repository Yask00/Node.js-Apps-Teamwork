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
        console.log(model);
        return this.collection.insert(model);
    }

    getDbModel(model) {
        const dbModel = {};
        if (Object.keys(model).length === 0) {
            return Promise.reject('Редактирането е неуспешно!');
        }
        Object.keys(model)
            .forEach((prop) => {
                if (model[prop] &&
                    model[prop] !== model.id &&
                    model[prop] !== model.single) {
                    dbModel[prop] = model[prop];
                }
            });
        if (Static.isValid(dbModel, this.validator)) {
            return dbModel;
        }

        return Promise.reject('Редактирането е неуспешно!');
    }
}

module.exports = BaseData;