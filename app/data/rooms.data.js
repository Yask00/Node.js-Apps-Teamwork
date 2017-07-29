const BaseData = require('./base/base');

class RoomsData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }

    update(body) {
        let resultRoom;
        return this.getById(body.roomId)
            .then((result) => {
                if (!result) {
                    return Promise.reject('Редактирането е неуспешно!');
                }
                resultRoom = result;
                const dbModel = this.getDbModel(body);
                return Promise.resolve(dbModel);
            }).then((dbModel) => {
                delete dbModel.roomId;
                return this.collection.update(
                    { _id: resultRoom._id }, { $set: dbModel });
            }).then(() => {
                return Promise.resolve(resultRoom._id);
            });
    }
}

const init = (db, Model, validator) => {
    return new RoomsData(db, Model, validator);
};

module.exports = { init };
