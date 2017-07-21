const BaseData = require('../data/base/base');
const Regions = require('../models/region.model');

class RegionsData extends BaseData {
    constructor(db) {
        super(db, Regions, Regions);
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = RegionsData;
