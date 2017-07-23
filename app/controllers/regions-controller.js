class RegionsController {
    constructor(data) {
        this.data = data;
    }

    getAllRegions(req, res) {
        this.data.regions.getAll({}, {})
            .then((regions) => {
                res.render('region/all', {
                    context: regions,
                });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    getCreateForm(req, res) {
        return res.render('region/form');
    }

    // =============== TO: DELETE this
    getAdminPanel(req, res) {
        return res.render('admin/panel');
    }

    getOrderRoomForm(req, res) {
        return res.render('order/booking-room');
    }

     getOrderServiceForm(req, res) {
        return res.render('order/booking-service');
    }// ============ TO: DELETE this

    createNewRegion(req, res) {
        const region = req.body;
        region.hotels = [];

        // validate region
        this.data.regions.create(region)
            .then(() => {
                res.redirect('/regions');
            })
            .catch((err) => {
                res.render('region/form', { error: err });
            });
    }

    // updateRegion(req, res) {

    // }

    getRegionDetails(req, res) {
        return res.render('region/details');
    }

    // getRegionsGallery(req, res) {

    // },
    // getOneRegionGallery(req, res) {

    // },
}

const init = (data) => {
    return new RegionsController(data);
};

module.exports = { init };
