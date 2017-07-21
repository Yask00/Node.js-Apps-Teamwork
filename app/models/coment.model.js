class Coment {
    constructor(options) {
        this._id = options._id;
        this.userId = options.userId;
        this.hotelId = options.hotelId;
        this.content = options.content;
        this.createdOn = options.createdOn;
    }

    get id() {
        return this._id;
    }
}

module.exports = Coment;
