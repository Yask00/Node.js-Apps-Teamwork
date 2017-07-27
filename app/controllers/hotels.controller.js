class HotelsController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        this.data.hotels.getAll()
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
        this.data.hotels.getById(req.params.id)
            .then((dbHotel) =>
                res.render('hotel/details', {
                    hotel: dbHotel,
                    user: req.user,
                }))
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getHotelGallery(req, res) {
        this.data.hotels.getById(req.params.id)
            .then((dbHotel) => {
                res.render('hotel/gallery', { hotel: dbHotel });
            })
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getCreateForm(req, res) {
        this.data.regions.getAll()
            .then((regions) => {
                return res.render('hotel/form', {
                    user: req.user,
                    regions,
                });
            });
    }

    getAddForm(req, res) {
        return res.render('hotel/addform', {
            user: req.user,
            hotelId: req.params.id,
        });
    }

    getUpdateForm(req, res) {
        return res.render('hotel/updateform', {
            user: req.user,
            hotelId: req.params.id,
        });
    }

    update(req, res) {
        let dbHotel;
        return this.data.hotels.update(req.body)
            .then((id) => {
                return this.data.hotels.getById(id);
            }).then((hotel) => {
                dbHotel = hotel;
                return this.data.regions.updateCollection(dbHotel);
            }).then(() => {
                req.flash('Hotel updated succesfuly',
                    `Хотелът e успешно променен`);
                res.render('hotel/details', {
                    message: req.flash('Hotel updated succesfuly'),
                    hotel: dbHotel,
                    user: req.user,
                });
            }).catch((err) => {
                req.flash(
                    'Invalid data', 'Неуспешен запис: невалидни данни!');
                res.render('hotel/updateform', {
                    user: req.user,
                    hotelId: req.body.id,
                    message: req.flash('Invalid data'),
                });
            });
    }

    add(req, res) {
        this.data.hotels.addToCollection(req.body)
            .then(() => {
                return this.data.hotels.getById(req.body.hotelId);
            }).then((dbHotel) => {
                res.render('hotel/gallery', { hotel: dbHotel });
            }).catch((err) => {
                req.flash(
                    'Add failed', 'Неуспешен запис: невалидни данни!');
                res.render('hotel/addform', {
                    user: req.user,
                    hotelId: req.body.hotelId,
                    message: req.flash('Add failed'),
                });
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
            }).then((dbHotel) => {
                this.data.regions.addToCollection(dbHotel.ops[0]);
                res.redirect('./profile');
                // req.flash('Hotel created succesfuly',
                //     `Хотел ${dbHotel.ops[0].name} е успешно създаден`);
                // res.render('hotel/details', {
                //     message: req.flash('Hotel created succesfuly'),
                //     hotel: dbHotel.ops[0],
                // });
            }).catch((err) => {
                req.flash('Failed creation',
                    'Записът e неуспешен поради невалидни данни!');
                res.render('hotel/form', {
                    message: req.flash('Failed creation'),
                    user: req.user,
                });
            });
    }
}

const init = (data) => {
    return new HotelsController(data);
};

module.exports = { init };