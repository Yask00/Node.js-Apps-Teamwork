class Order {
    constructor(options) {
        this.userId = options.userId;
        this.paymentType = options.paymentType;
        this.totalPrice = options.totalPrice;
        this.bookingRoom = [];
        this.bookingService = [];
    }

    get id() {
        return this._id;
    }
}

module.exports = Order;