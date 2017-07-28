class Order {
    constructor(options) {
        this._id = options._id;
        // this.userId = options.userId;
        this.paymentType = options.paymentType;
        // 'В брой', 'По банков път', 'EasyPay'
        this.price = options.price;
        this.nightsCount = options.nightsCount;
        this.serviceType = options.serviceType; // can be blank
        this.username = options.username;
        this.hotel = options.hotel;
        this.room = options.room;
        // this.bookingRoom = [];
        // this.bookingService = [];
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Comment();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Order;
