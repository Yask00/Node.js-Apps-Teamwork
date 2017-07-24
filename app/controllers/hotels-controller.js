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
            .catch((err) => res.render('user/error', { error: err }));
    }

    getHotelDetails(req, res) {
        this.data.hotels.getById(req.params.id)
            .then((dbHotel) =>
                res.render('hotel/details', {
                    hotel: dbHotel,
                    user: req.user,
                }))
            .catch((err) => res.render('user/error', { error: err }));
    }

    getHotelGallery(req, res) {
        this.data.hotels.getById(req.params.id)
            .then((dbHotel) => res.render('hotel/gallery', { hotel: dbHotel }))
            .catch((err) => res.render('user/error', { error: err }));
    }

    getCreateForm(req, res) {
        return res.render('hotel/form', { user: req.user });
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
        this.data.hotels.update(req.body.id, req.body)
            .then(() => {
                this.data.hotels.getById(req.body.id)
                    .then((dbHotel) => {
                        res.render('hotel/details', { hotel: dbHotel });
                    });
            }).catch((err) => {
                req.flash('Invalid data', 'Записът неуспешен поради невалидни данни!');
                res.render('hotel/updateform', {
                    user: req.user,
                    hotelId: req.body.id,
                    message: req.flash('Invalid data'),
                });
            });
    }

    add(req, res) {
        console.log(req.body);
        this.data.hotels.updateCollection(req.body.hotelId, req.body)
            .then(() => {
                this.data.hotels.getById(req.body.hotelId)
                    .then((dbHotel) => {
                        res.render('hotel/gallery', { hotel: dbHotel });
                    });
            }).catch((err) => {
                req.flash('Add failed', 'Записът неуспешен поради невалидни данни!');
                res.render('hotel/add', {
                    user: req.user,
                    hotelId: req.body.hotelId,
                    message: req.flash('Add failed'),
                });
            });
    }

    createHotel(req, res) {
        this.data.hotels.create(req.body)
            .then((dbHotel) => {
                req.flash('Hotel created succesfuly',
                    `Хотел ${dbHotel.name} успешно създаден`);
                res.render('hotel/details', {
                    message: req.flash('Hotel created succesfuly'),
                    hotel: dbHotel,
                });
            }).catch((err) => {
                req.flash('Failed creation',
                    'Записът неуспешен поради невалидни данни!');
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