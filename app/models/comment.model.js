class Comment {
    constructor(options) {
        this._id = options._id;
        this.username = options.username;
        this.hotelId = options.hotelId;
        this.content = options.content;
        this.createdOn = options.createdOn;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Comment();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Comment;

