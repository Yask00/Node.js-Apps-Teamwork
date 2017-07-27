class RegionsController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        this.data.regions.getAll({}, {})
            .then((regions) => {
                res.render('regions/all', {
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
                res.render('regions/details', {
                    region: dbRegion,
                    user: req.user,
                }))
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getChooseForm(req, res) {
        this.data.regions.getAll()
            .then((regions) =>
                res.render('admin/region', {
                    regions: regions,
                    user: req.user,
                }))
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getCreateForm(req, res) {
        return res.render('regions/form', {
            user: req.user,
        });
    }

    getUpdateForm(req, res) {
        return res.render('regions/update', {
            user: req.user,
            regionId: req.params.id,
        });
    }

    createRegion(req, res) {
        this.data.regions.create(req.body)
            .then(() => {
                res.redirect('./profile');
                // req.flash('Region created',
                //     `Регион ${dbRegion.ops[0].name} е успешно създаден`);
                // res.render('regions/details', {
                //     message: req.flash('Region created'),
                //     user: req.user,
                //     region: dbRegion.ops[0],
                // });
            }).catch((err) => {
                req.flash('Failed creation',
                    'Записът e неуспешен поради невалидни данни!');
                res.render('regions/form', {
                    message: req.flash('Failed creation'),
                    user: req.user,
                });
            });
    }

    update(req, res) {
        return this.data.regions.update(req.body)
            .then((id) => {
                return this.data.regions.getById(id);
            }).then((dbRegion) => {
                req.flash('Region success',
                    `Регион ${dbRegion.name} e успешно променен`);
                res.render('regions/details', {
                    message: req.flash('Region success'),
                    region: dbRegion,
                    user: req.user,
                });
            }).catch((err) => {
                req.flash(
                    'Invalid data', 'Неуспешен запис: невалидни данни!');
                res.render('regions/update', {
                    user: req.user,
                    regionId: req.body.regionId,
                    message: req.flash('Invalid data'),
                });
            });
    }
}

const init = (data) => {
    return new RegionsController(data);
};

module.exports = { init };