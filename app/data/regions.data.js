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
        return this.collection.update({}, {
            $pull: { hotels: { _id: body._id } },
        });
    }

    updateCollection(body) {
        const dbModel = this.getDbModel(body);
        this.removeFromCollection(dbModel)
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

    update(body) {
        let resultRegion;
        return this.getById(body.regionId)
            .then((result) => {
                if (!result) {
                    return Promise.reject('Редактирането е неуспешно!');
                }
                resultRegion = result;
                const dbModel = this.getDbModel(body);
                return Promise.resolve(dbModel);
            }).then((dbModel) => {
                delete dbModel.regionId;
                return this.collection.update({ _id: resultRegion._id }, { $set: dbModel });
            }).then((updatedRegion) => {
                return Promise.resolve(resultRegion._id);
            });
    }
}

const init = (db, Model, validator) => {
    return new RegionData(db, Model, validator);
};

module.exports = { init };