class IndexController {
    constructor(data) {
        this.data = data;
    }

    getIndexPage(req, res) {
                res.render('home/index', {
                    user: req.user,
                });
    }
}

const init = (data) => {
    return new IndexController(data);
};

module.exports = { init };
