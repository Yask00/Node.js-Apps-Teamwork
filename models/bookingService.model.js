class BookingService {
    constructor(options) {
        this._id = options._id;
        this.userId = options.userId;
        this.eventDate = options.eventDate;
        this.serviceId = options.serviceId;
        this.hotelId = options.hotelId;
        this.personCount = options.personCount;
    }

    get id() {
        return this._id;
    }
}

module.exports = BookingService;