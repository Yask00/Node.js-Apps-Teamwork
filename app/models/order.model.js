class Order {
    constructor(options) {
        this._id = options._id;
        // this.userId = options.userId;
        this.paymentType = options.paymentType;
        // 'В брой', 'По банков път', 'EasyPay'
        this.price = options.price;
        this.nightsCount = options.nightsCount;
        this.serviceType = options.serviceType; // can be blank
        // this.bookingRoom = [];
        // this.bookingService = [];
    }

    get id() {
        return this._id;
    }
}

module.exports = Order;
