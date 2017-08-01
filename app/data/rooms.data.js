const BaseData = require('./base/base');
const { ObjectID } = require('mongodb');

class RoomsData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }

    setStatus(id, status) {
        return this.collection.update({ _id: id }, { $set: { roomStatus: status } });
    }

    update(id, body) {
        const dbModel = this.getDbModel(body);
        return this.collection.update({ _id: new ObjectID(id) }, { $set: dbModel });
    }
}

const init = (db, Model, validator) => {
    return new RoomsData(db, Model, validator);
};

module.exports = { init };