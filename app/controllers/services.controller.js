class ServicesController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        this.data.services.getAll()
            .then((services) => {
                res.render('service/all', {
                    context: services,
                    user: req.user,
                });
            })
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getDetails(req, res) {
        this.data.services.getById(req.params.id)
            .then((dbService) =>
                res.render('service/details', {
                    service: dbService,
                    user: req.user,
                })).catch((err) => {
                    res.render('user/error', { error: err });
                });
    }

    getCreateForm(req, res) {
        return res.render('service/form', {
            user: req.user,
        });
    }

    getUpdateForm(req, res) {
        return res.render('service/updateform', {
            user: req.user,
            serviceId: req.params.id,
        });
    }

    update(req, res) {
        console.log(req.body);
        this.data.services.update(req.body.id, req.body)
            .then(() => {
                this.data.services.getById(req.body.id)
                    .then((dbService) => {
                        req.flash('Service updated succesfuly',
                            `Услугата успешно променена`);
                        res.render('service/details', {
                            message: req.flash('Service updated succesfuly'),
                            service: dbService,
                        });
                    });
            }).catch((err) => {
                req.flash(
                    'Invalid data', 'Неуспешен запис: невалидни данни!');
                res.render('service/updateform', {
                    user: req.user,
                    serviceId: req.body.id,
                    message: req.flash('Invalid data'),
                });
            });
    }

    createService(req, res) {
        console.log(req.body);
        this.data.services.create(req.body)
            .then((dbService) => {
                req.flash('Service created succesfuly',
                    `Услугата e успешно създаденa`);
                res.render('service/details', {
                    message: req.flash('Service created succesfuly'),
                    service: req.body,
                });
            }).catch((err) => {
                req.flash('Failed creation',
                    'Записът e неуспешен поради невалидни данни!');
                res.render('service/form', {
                    message: req.flash('Failed creation'),
                    user: req.user,
                });
            });
    }
}

const init = (data) => {
    return new ServicesController(data);
};

module.exports = { init };
