class RegionsController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        this.data.regions.getAll({}, {})
            .then((regions) => {
                res.render('region/all', {
                    context: regions,
                    user: req.user,
                });
            })
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getRegionDetails(req, res) {
        this.data.regions.getById(req.params.id)
            .then((dbRegion) =>
                res.render('region/details', {
                    region: dbRegion,
                    user: req.user,
                }))
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getRegionGallery(req, res) {
        this.data.regions.getById(req.params.id)
            .then((dbRegion) => {
                res.render('region/gallery', { region: dbRegion });
            })
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getCreateForm(req, res) {
        return res.render('region/form', {
                    user: req.user,
                });
    }

    getAddForm(req, res) {
        return res.render('region/addform', {
            user: req.user,
            regionId: req.params.id,
        });
    }

    getUpdateForm(req, res) {
        return res.render('region/updateform', {
            user: req.user,
            regionId: req.params.id,
        });
    }

    // =============== TO: DELETE this
    getAdminPanel(req, res) {
        return res.render('admin/panel', {
                    user: req.user,
                });
    }

    getOrderRoomForm(req, res) {
        return res.render('order/booking-room', {
                    user: req.user,
                });
    }

     getOrderServiceForm(req, res) {
        return res.render('order/booking-service', {
                    user: req.user,
                });
    }// ============ TO: DELETE this

    createRegion(req, res) {
        this.data.regions.create(req.body)
            .then((dbRegion) => {
                req.flash('Region created succesfuly',
                    `Регион ${dbRegion.name} е успешно създаден`);
                res.render('region/details', {
                    message: req.flash('Region created succesfuly'),
                    region: dbRegion,
                });
            }).catch((err) => {
                req.flash('Failed creation',
                    'Записът e неуспешен поради невалидни данни!');
                res.render('region/form', {
                    message: req.flash('Failed creation'),
                    user: req.user,
                });
            });
    }

    // updateRegion(req, res) {

    // }
}

const init = (data) => {
    return new RegionsController(data);
};

module.exports = { init };
