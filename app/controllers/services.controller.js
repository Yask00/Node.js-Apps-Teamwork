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
            }).catch((err) => res.render('user/error', { error: err }));
    }

    getDetails(req, res) {
        this.data.services.getById(req.params.id)
            .then((dbService) =>
                res.render('service/details', {
                    service: dbService,
                    user: req.user,
                })).catch((err) => res.render('user/error', { error: err }));
    }

    getCreateForm(req, res) {
        this.data.hotels.getAll()
            .then((hotels) => {
                return res.render('service/form', {
                    message: req.flash('Service success'),
                    error: req.flash('Service error'),
                    user: req.user,
                    hotels,
                });
            });
    }

    getUpdateForm(req, res) {
        this.data.services.getAll()
            .then((services) =>
                res.render('service/update', {
                    message: req.flash('Service success'),
                    error: req.flash('Service error'),
                    user: req.user,
                    services,
                }));
    }

    createService(req, res) {
        return this.data.services.create(req.body)
            .then((result) => {
                const dbService = result.ops[0];
                this.data.hotels.addToCollection(dbService, 'services');
                req.flash('Service success',
                    `Услуга ${dbService.serviceType} e успешно добавена`);
                return this.getCreateForm(req, res);
            }).catch((err) => {
                req.flash('Service error',
                    'Записът неуспешен поради невалидни данни!');
                return this.getCreateForm(req, res);
            });
    }

    update(req, res) {
        let dbService;
        return this.data.services.update(req.params.id, req.body)
            .then(() => {
                return this.data.services.getById(req.params.id);
            }).then((service) => {
                dbService = service;
                return this.data.hotels.updateCollection(dbService, 'services');
            }).then(() => {
                req.flash('Service success',
                    `Услуга ${dbService.serviceType} e успешно промененa`);
                return this.getUpdateForm(req, res);
            }).catch((err) => {
                console.log(err);
                req.flash(
                    'Service error', 'Неуспешен запис: невалидни данни!');
                return this.getUpdateForm(req, res);
            });
    }
}

const init = (data) => {
    return new ServicesController(data);
};

module.exports = { init };
