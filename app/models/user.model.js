class User {
    constructor(options) {
        this._id = options._id;
        this.username = options.username;
        this.password = options.password;
        this.firstName = options.firstName;
        this.lastName = options.lastName;
        this.phone = options.phone;
        this.email = options.email;
<<<<<<< HEAD
        this.role = options.role; //[]
        this.roomOrders = options.roomOrders; //[]
        this.serviceOrders = options.serviceOrders; //[]
=======
        this.roles = options.roles; // []
        this.roomOrders = options.roomOrders; // []
        this.serviceOrders = options.serviceOrders; // []
>>>>>>> e8d078f72e35182dc35cc68ea7c49e73697cc66e
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
