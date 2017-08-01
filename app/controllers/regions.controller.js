class RegionsController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        return this.data.regions.getAll({}, {})
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
        return this.data.regions.getById(req.params.id)
            .then((dbRegion) =>
                res.render('regions/details', {
                    region: dbRegion,
                    user: req.user,
                }))
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getRegionReview(req, res) {
        return this.data.regions.getById(req.params.id)
            .then((dbRegion) =>
                res.render('regions/review', {
                    region: dbRegion,
                    user: req.user,
                })).catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getUpdateForm(req, res) {
        if (!req.single) {
            return this.data.regions.getAll()
                .then((regions) =>
                    res.render('regions/update', {
                        message: req.flash('Region success'),
                        error: req.flash('Region error'),
                        user: req.user,
                        regions,
                    }));
        }
        return res.render('regions/update', {
            message: req.flash('Region success'),
            error: req.flash('Region error'),
            user: req.user,
            regionId: req.params.id,
        });
    }

    getCreateForm(req, res) {
        return res.render('regions/form', {
            message: req.flash('Region success'),
            error: req.flash('Region error'),
            user: req.user,
        });
    }

    createRegion(req, res) {
        return this.data.regions.create(req.body)
            .then((result) => {
                const dbRegion = result.ops[0];
                req.flash('Region success',
                    `Регион ${dbRegion.name} e успешно добавен`);
                return this.getCreateForm(req, res);
            }).catch((err) => {
                req.flash('Region error',
                    'Записът e неуспешен поради невалидни данни!');
                return this.getCreateForm(req, res);
            });
    }

    update(req, res) {
        const single = req.body.single;
        return this.data.regions.update(req.params.id, req.body)
            .then(() => {
                return this.data.hotels.getById(req.params.id);
            }).then((region) => {
                req.flash('Region success',
                    `Регион ${region.name} e успешно променен`);
                if (single) {
                    return this.getRegionDetails(req, res);
                }
                return this.getUpdateForm(req, res);
            }).catch((err) => {
                req.flash('Region error',
                    'Неуспешен запис: невалидни данни!');
                if (single) {
                    return this.getRegionDetails(req, res);
                }
                return this.getUpdateForm(req, res);
            });
    }
}

const init = (data) => {
    return new RegionsController(data);
};

module.exports = { init };
