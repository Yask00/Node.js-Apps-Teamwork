class Order {
    constructor(options) {
        this._id = options._id;
        this.userId = options.userId;
        this.paymentType = options.paymentType;
        this.price = options.price;
        this.bookingRoom = [];
        this.bookingService = [];
    }

    get id() {
        return this._id;
    }
}

module.exports = Order;