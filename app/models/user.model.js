class User {
    constructor(options) {
        this._id = options._id;
        this.username = options.username;
        this.password = options.password;
        this.firstName = options.firstName;
        this.lastName = options.lastName;
        this.phone = options.phone;
        this.email = options.email;
        this.role = options.role; //[]
        this.roomOrders = options.roomOrders; //[]
        this.serviceOrders = options.serviceOrders; //[]

    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new User();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = User;