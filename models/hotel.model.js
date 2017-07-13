class Hotel {
    constructor(options) {
        this._id = options._id;
        this.name = options.name;
        this.phone = options.phone;
        this.imageURL = options.imageURL;
        this.description = options.description;
        this.location = options.location;
        this.lattitude = options.lattitude;
        this.longitude = options.longitude;
        this.rooms = [];
        this.services = [];
        this.comments = [];
        this.likes = [];
    }

    get id() {
        return this._id;
    }
}

module.exports = Hotel;