class HotelsController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        this.data.hotels.getAll()
            .then((hotels) => {
                res.render('hotel/all', {
                    context: hotels,
                });
            })
            .catch((err) => res.render('user/error', { error: err }));
    }

    getHotelDetails(req, res) {
        this.data.hotels.getById(req.params.id)
            .then((dbHotel) => res.render('hotel/details', { hotel: dbHotel }))
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

    getUpdateForm(req, res, error) {
        req.flash('Invalid data', error);
        return res.render('hotel/updateform', {
            user: req.user,
            hotelId: req.params.id,
            message: req.flash('Invalid data'),
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
                res.redirect('updateformerr/' + req.body.id);
            });
    }

    add(req, res) {
        this.data.hotels.updateCollection(req.params.id, req.body)
            .then(() => {
                this.data.hotels.getById(req.params.id)
                    .then((dbHotel) => {
                        res.render('hotel/gallery', { hotel: dbHotel });
                    });
            }).catch((err) => {
                req.flash('Failed add',
                    'Записът неуспешен поради невалидни данни!');
                res.render('hotel/add', { message: req.flash('Failed add') });
            });
    }

    createHotel(req, res) {
        this.data.hotels.create(req.body)
            .then((dbHotel) => {
                req.flash('Hotel created succesfuly',
                    `Хотел ${dbHotel.name} успешно създаден`);
                res.render('hotel/details', {
                    message: req.flash('Hotel created succesfuly'),
                });
            }).catch((err) => {
                req.flash('Failed creation',
                    'Записът неуспешен поради невалидни данни!');
                res.render('hotel/form', { message: req.flash('Failed creation') });
            });
    }
}

const init = (data) => {
    return new HotelsController(data);
};

module.exports = { init };