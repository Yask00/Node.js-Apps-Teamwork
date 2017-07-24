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
        const collections = {
            rooms: { rooms: body },
            services: { rooms: body },
            comments: { rooms: body },
            likes: { rooms: body },
        };
        const params = collections[body.collection];
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