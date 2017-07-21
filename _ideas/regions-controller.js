const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.regions.getAll()
                .then((regions) => {
                    return res.render('region/all', {
                        context: regions,
                    });
                });
        },
        getCreateForm(req, res) {
            return res.render('region/form');
        },
        createNewRegion(req, res) {
            const region = req.body;

            // validate region
            return data.regions.create(region)
                .then(() => {
                    return res.redirect('/regions');
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/regions/create');
                });
        },
        // updateRegion(req, res) {

        // },
        getRegionDetails(req, res) {
            return res.render('region/details');
        },
        // getRegionsGallery(req, res) {

        // },
        // getOneRegionGallery(req, res) {

        // },
    };

    return controller;
};

module.exports = { init };
