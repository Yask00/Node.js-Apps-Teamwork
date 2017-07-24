const BaseData = require('./base/base');
const Static = require('../models/static');
const { ObjectID } = require('mongodb');

class HotelData extends BaseData {
    constructor(db, Model, validator) {
        super(db, Model, validator);
    }

    getByName(name) {
        return this.collection.findOne({ name: name });
    }

    updateCollection(id, body) {
        const collection = body.collection;
        const item = body;
        const params = {
            collection: item,
        };
        return this.collection.update({ _id: new ObjectID(id) }, { $push: params });
    }

    update(id, body) {
        return this.getById(id)
            .then((resultHotel) => {
                if (resultHotel) {
                    return this.collection.update({ _id: resultHotel._id }, {
                        $set: {
                            name: body.name,
                            phone: body.phone,
                            imageURL: body.imageURL,
                            description: body.description,
                            region: body.region,
                            lattitude: body.lattitude,
                            longitude: body.longitude,
                        },
                    });
                }
            });
    }
}

const init = (db, Model, validator) => {
    return new HotelData(db, Model, validator);
};

module.exports = { init };