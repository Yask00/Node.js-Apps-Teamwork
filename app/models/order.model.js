class Order {
    constructor(options) {
        this._id = options._id;
        this.hotelName = options.hotelName;
        this.nightsCount = options.nightsCount;
        this.room = options.room;
        this.price = options.price;
        this.paymentType = options.paymentType;
        this.serviceType = options.serviceType; // can be blank
        this.username = options.username;
        this.userId = options.userId;
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