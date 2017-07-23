class Hotel {
    constructor(options) {
        this._id = options._id;
        this.name = options.name;
        this.phone = options.phone;
        this.imageURL = options.imageURL;
        this.description = options.description;
        this.region = options.region;
        this.lattitude = options.lattitude;
        this.longitude = options.longitude;
        this.rooms = [];
        this.services = [];
        this.comments = [];
        this.likes = [];
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Hotel();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Hotel;
