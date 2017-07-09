class Service {
    constructor(options) {
        this.serviceType = options.serviceType;
        this.imageURL = options.imageURL;
        this.hotelId = options.hotelId;
        this.price = options.price;
    }

    get id() {
        return this._id;
    }
}

module.exports = Service;