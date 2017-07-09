class User {
    constructor(options) {
        this.firstName = options.firstName;
        this.lastName = options.lastName;
        this.phone = options.phone;
        this.email = options.email;
        this.roles = [];
        this.roomOrders = [];
        this.serviceOrders = [];
    }

    get id() {
        return this._id;
    }
}

module.exports = User;