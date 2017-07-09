class Room {
    constructor(options) {
        this.roomType = options.roomType;
        this.imageURL = options.imageURL;
        this.hotelId = options.hotelId;
        this.description = options.description;
        this.price = options.price;
    }

    get id() {
        return this._id;
    }
}

module.exports = Room;