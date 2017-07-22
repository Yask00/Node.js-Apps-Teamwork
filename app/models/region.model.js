class Region {
    constructor(options) {
        this._id = options._id;
        this.name = options.name;
        this.imageURL = options.imageURL;
        this.mapURL = options.mapURL;
        this.description = options.description;
        this.regionType = options.regionType;
        this.hotels = options.hotels;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Region();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Region;
