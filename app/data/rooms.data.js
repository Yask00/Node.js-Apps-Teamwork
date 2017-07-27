const BaseData = require('./base/base');
// const Static = require('../models/static');
// const { ObjectID } = require('mongodb');

class RoomsData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }

    update(body) {
        return this.getById(body.roomId)
            .then((resultRoom) => {
                if (!resultRoom) {
                    return Promise.reject('Редактирането е неуспешно!');
                }
                const dbModel = this.getDbModel(body);
                return this.collection.update({ _id: resultRoom._id }, {
                    $set: dbModel,
                });
            });
    }
}

const init = (db, Model, validator) => {
    return new RoomsData(db, Model, validator);
};

module.exports = { init };
