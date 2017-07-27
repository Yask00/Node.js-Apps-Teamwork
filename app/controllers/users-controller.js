class UsersController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('user/register');
    }

    getAddForm(req, res) {
        return res.render('user/addorder', { user: req.user });
    }

    getSignInForm(req, res, error) {
        req.flash('Invalid credentials', error);
        return res.render('user/login', {
            message: req.flash('Invalid credentials'),
        });
    }

    getUpdateForm(req, res) {
        return res.render('user/update', { user: req.user });
    }

    showError(req, res) {
        return res.render('user/error');
    }

    getUserProfile(req, res) {
        this.data.users.getById(req.user._id)
            .then((dbUser) => {
                this.data.orders.getAll({ username: dbUser.username })
                .then((dbOrders) => {
                    res.render('user/profile', {
                    user: dbUser,
                    orders: dbOrders,
                });
                });
            });
    }

    getAdminPanel(req, res) {
        this.data.users.getById(req.user._id)
            .then((dbUser) => {
                res.render('admin/panel', { user: dbUser });
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

    addItem(req, res) {
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
                    req.flash('Failed username',
                        'Този потребител вече съществува');
                    res.render('user/register', {
                        message: req.flash('Failed username'),
                    });
                    return;
                }

                this.data.users.getByEmail(bodyUser.email)
                    .then((dUser) => {
                        if (dUser) {
                            req.flash('Failed email',
                                'Този email вече е използван за регистрация');
                            res.render('user/register', {
                                message: req.flash('Failed email'),
                            });
                            return;
                        }
                    });

                this.data.users.create(bodyUser)
                    .then((User) => {
                        req.flash('Successful Registration',
                            'Вие се регистрирахте успешно, моля влезте');
                        res.render('user/login', {
                            message: req.flash('Successful Registration'),
                        });
                    }).catch((err) => {
                        req.flash('Failed registration',
                            'Регистрацията неуспешна: невалидни данни!');
                        res.render('user/register', {
                            message: req.flash('Failed registration'),
                        });
                    });
            });
    }
}

const init = (data) => {
    return new UsersController(data);
};

module.exports = { init };
