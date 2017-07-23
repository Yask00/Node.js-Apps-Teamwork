class HotelsController {
    constructor(data) {
        this.data = data;
    }

    getAllHotels(req, res) {
        this.data.hotels.getAll({}, {})
            .then((hotels) => {
                res.render('hotel/all', {
                    context: hotels,
                });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    getCreateForm(req, res) {
        return res.render('hotel/form');
    }

    getHotelDetails(req, res) {
        return res.render('hotel/details');
    }

    getHotelGallery(req, res) {
        return res.render('hotel/gallery');
    }
}

const init = (data) => {
    return new HotelsController(data);
};

module.exports = { init };

