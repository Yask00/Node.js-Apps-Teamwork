class Region {
    constructor(options) {
        this._id = options._id;
        this.name = options.name;
        this.imageURLs = [];
        this.mapURL = options.mapURL;
        this.description = options.description;
        this.regionType = options.regionType;
    }

    get id() {
        return this._id;
    }
}

module.exports = Region;