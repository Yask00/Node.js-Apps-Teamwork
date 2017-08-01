class Room {
    constructor(options) {
        this._id = options._id;
        this.roomType = options.roomType;
        this.imageURL = options.imageURL;
        this.hotelId = options.hotelId;
        this.hotelName = options.hotelName;
        this.description = options.description;
        this.price = options.price;
        this.roomStatus = options.roomStatus;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Room();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Room;
