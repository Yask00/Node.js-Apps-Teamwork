class User {
    constructor(options) {
        this._id = options._id;
        this.username = options.username;
        this.password = options.password;
        this.firstName = options.firstName;
        this.lastName = options.lastName;
        this.phone = options.phone;
        this.email = options.email;
        this.roles = options.roles; //[]
        this.roomOrders = options.roomOrders; //[]
        this.serviceOrders = options.serviceOrders; //[]
    }

    get id() {
        return this._id;
    }
}

module.exports = User;