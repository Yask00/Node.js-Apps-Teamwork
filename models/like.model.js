class Like {
    constructor(options) {
        this.userId = options.userId;
        this.hotelId = options.hotelId;
    }

    get id() {
        return this._id;
    }
}

module.exports = Like;