
class Room {
    constructor(options) {
        this._id = options._id;
        this.roomType = options.roomType; // ['one', 'two', 'three', 'four'],
        this.imageURL = options.imageURL;
        // this.hotelId = options.hotelId; // 24
        this.description = options.description;
        this.price = options.price; // 22,22
        this.roomStatus = options.roomStatus; // free or booked
        this.roomCount = options.roomCount; // 1 to 36
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
