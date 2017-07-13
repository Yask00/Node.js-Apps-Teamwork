class BookingRoom {
    constructor(options) {
        this._id = options._id;
        this.userId = options.userId;
        this.startDate = options.startDate;
        this.roomId = options.roomId;
        this.hotelId = options.hotelId;
        this.nightsCount = options.nightsCount;
    }

    get id() {
        return this._id;
    }
}

module.exports = BookingRoom;