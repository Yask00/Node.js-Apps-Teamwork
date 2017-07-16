module.exports = {
    register: (req, res) => {
        res.render('user/register');
    },
    getLogin: (req, res) => {
        res.render('user/login');
    },
};
