const BaseData = require('./base/base');
const { ObjectID } = require('mongodb');
const Static = require('../models/static');

class RegionData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }

    removeFromCollection(body) {
        return this.collection.update({ _id: new ObjectID(body.regionId) }, {
            $pull: { hotels: { _id: body._id } },
        });
    }

    updateCollection(body) {
        const dbModel = this.getDbModel(body);
        return this.removeFromCollection(dbModel)
            .then(() => {
                return this.addToCollection(dbModel);
            });
    }

    addToCollection(body) {
        if (Static.isValid(body, this.validator)) {
            return this.collection.update({ _id: new ObjectID(body.regionId) }, { $push: { hotels: body } });
        }
        return Promise.reject('Добавянето е неуспешно!');
    }

    update(id, body) {
        const dbModel = this.getDbModel(body);
        return this.collection.update({ _id: new ObjectID(id) }, { $set: dbModel });
    }
}

const init = (db, Model, validator) => {
    return new RegionData(db, Model, validator);
};

module.exports = { init };