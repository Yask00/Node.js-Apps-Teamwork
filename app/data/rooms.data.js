const BaseData = require('./base/base');
const Static = require('../models/static');
const { ObjectID } = require('mongodb');

class RoomsData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }

    update(id, body) {
        return this.getById(id)
            .then((resultRoom) => {
                if (!resultRoom) {
                    return Promise.reject('Редактирането е неуспешно!');
                }

                return this.collection.update({ _id: resultRoom._id }, {
                        $set: {
                            roomType: body.roomType,
                            imageURL: body.imageURL,
                            description: body.description,
                            price: body.price,
                            roomStatus: body.roomStatus,
                            roomCount: body.roomCount,
                        },
                    });
            });
    }
}

const init = (db, Model, validator) => {
    return new RoomsData(db, Model, validator);
};

module.exports = { init };
