class UsersController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('user/register');
    }

    getAddForm(req, res) {
        return res.render('user/addorder');
    }

    getSignInForm(req, res) {
        return res.render('user/login');
    }

    getUpdateForm(req, res) {
        return res.render('user/update');
    }

    showError(req, res) {
        return res.render('user/error');
    }

    getUserProfile(req, res) {
        this.data.users.getById(req.user._id)
            .then((dbUser) => {
                res.render('user/profile', { user: dbUser });
            });
    }

    update(req, res) {
        if (req.user) {
            this.data.users.update(req.user._id, req.body)
                .then(() => {
                    this.data.users.getById(req.user._id)
                        .then((dbUser) => {
                            res.redirect('/profile');
                        });
                });
        } else {
            res.render('user/login', { message: 'Please login first!' });
        }
    }

    add(req, res) {
        if (req.user) {
            this.data.users.updateCollection(req)
                .then(() => {
                    this.data.users.getById(req.user._id)
                        .then((dbUser) => {
                            res.redirect('/profile');
                        });
                }).catch((err) => {
                    res.render('user/addorder', { error: err });
                });
        } else {
            res.render('user/login', { message: 'Please login first!' });
        }
    }

    signOut(req, res) {
        req.logout();
        return res.redirect('/login');
    }

    signUp(req, res) {
        const bodyUser = req.body;
        this.data.users.getByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    req.flash('Failed username', 'From Connect flash in REGISTER Този потребител вече съществува');
                    res.render('user/error', { message: req.flash('Failed username') });
                    return;
                } else {
                    this.data.users.getByEmail(bodyUser.email)
                        .then((dUser) => {
                            if (dUser) {
                                req.flash('Failed email', 'From Connect flash in REGISTER Този email е използван за регистрация');
                                res.render('user/error', { message: req.flash('Failed email') });
                                return;
                            }
                        });
                }
                this.data.users.create(bodyUser)
                    .then((User) => {
                        req.flash('Successful Registration', 'From Connect flash in REGISTER Вие се регистрирахте успешно, моля влезте с вашите потребителско име и парола');
                        // res.redirect('/login');
                        res.render('user/login', { message: req.flash('Successful Registration') });
                    }).catch((err) => {
                        res.render('user/register', { error: err });
                    });
            });
    }
}

const init = (data) => {
    return new UsersController(data);
};

module.exports = { init };