const BaseData = require('./base/base');
const Static = require('../models/static');
const { ObjectID } = require('mongodb');

class ServiceData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }

    update(id, body) {
        if (Static.isValid(body, this.validator)) {
            return this.getById(id)
                .then((resultService) => {
                    if (resultService) {
                        return this.collection.update({ _id: resultService._id }, {
                            $set: {
                                description: body.description,
                                imageURL: body.imageURL,
                                hotelId: body.id,
                                price: body.price,
                            },
                        });
                    }
                });
        }
        return Promise.reject('Редактирането е неуспешно!');
    }
}

const init = (db, Model, validator) => {
    return new ServiceData(db, Model, validator);
};

module.exports = { init };