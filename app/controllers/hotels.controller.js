class HotelsController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        return this.data.hotels.getAll()
            .then((hotels) => {
                res.render('hotel/all', {
                    context: hotels,
                    user: req.user,
                });
            })
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getHotelDetails(req, res) {
        return this.data.hotels.getById(req.params.id)
            .then((dbHotel) =>
                res.render('hotel/details', {
                    message: req.flash('Hotel success'),
                    error: req.flash('Hotel error'),
                    hotel: dbHotel,
                    comments: dbHotel.comments,
                    user: req.user,
                }))
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getHotelGallery(req, res) {
        return this.data.hotels.getById(req.params.id)
            .then((dbHotel) => {
                res.render('hotel/gallery', { hotel: dbHotel });
            })
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getCreateForm(req, res) {
        return this.data.regions.getAll()
            .then((regions) => {
                return res.render('hotel/form', {
                    message: req.flash('Hotel success'),
                    error: req.flash('Hotel error'),
                    user: req.user,
                    regions,
                });
            });
    }

    getUpdateForm(req, res) {
        if (!req.single) {
            return this.data.hotels.getAll()
                .then((hotels) =>
                    res.render('hotel/update', {
                        message: req.flash('Hotel success'),
                        error: req.flash('Hotel error'),
                        user: req.user,
                        hotels,
                    }));
        }
        return res.render('hotel/update', {
            message: req.flash('Hotel success'),
            error: req.flash('Hotel error'),
            user: req.user,
            hotelId: req.params.id,
        });
    }

    update(req, res) {
        const single = req.body.single;
        let dbHotel;
        return this.data.hotels.update(req.params.id, req.body)
            .then(() => {
                return this.data.hotels.getById(req.params.id);
            }).then((hotel) => {
                dbHotel = hotel;
                return this.data.regions.updateCollection(dbHotel);
            }).then(() => {
                req.flash('Hotel success',
                    `Хотелът ${dbHotel.name} e успешно променен!`);
                if (single) {
                    return this.getHotelDetails(req, res);
                }
                return this.getUpdateForm(req, res);
            }).catch((err) => {
                req.flash(
                    'Hotel error', 'Неуспешен запис: невалидни данни!');
                if (single) {
                    return this.getHotelDetails(req, res);
                }
                return this.getUpdateForm(req, res);
            });
    }

    createHotel(req, res) {
        let body;
        return this.data.regions.getById(req.body.regionId)
            .then((dbRegion) => {
                body = req.body;
                body.region = dbRegion.name;
            }).then(() => {
                return this.data.hotels.create(body);
            }).then((hotel) => {
                const dbHotel = hotel.ops[0];
                this.data.regions.addToCollection(dbHotel);
                req.flash('Hotel success',
                    `Хотел ${dbHotel.name} e успешно добавен`);
                return this.getCreateForm(req, res);
            }).catch((err) => {
                req.flash('Hotel error',
                    'Записът e неуспешен поради невалидни данни!');
                return this.getCreateForm(req, res);
            });
    }
}

const init = (data) => {
    return new HotelsController(data);
};

module.exports = { init };
