const BaseData = require('../data/base/base');
const Hotels = require('../models/hotel.model');

class HotelsData extends BaseData {
    constructor(db) {
        super(db, Hotels, Hotels);
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = HotelsData;
