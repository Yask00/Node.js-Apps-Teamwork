class Like {
    constructor(options) {
        this._id = options._id;
        this.userId = options.userId;
        this.hotelId = options.hotelId;
    }

    get id() {
        return this._id;
    }
}

module.exports = Like;