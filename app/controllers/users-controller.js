class UsersController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('user/register');
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
                            res.render('user/profile', { user: dbUser });
                        });
                });
        } else {
            res.render('user/login', { message: 'Please login first!' });
        }
    }

    add(req, res) {
        if (req.user) {
            this.data.users.updateCollection(req.user, req.body)
                .then(() => {
                    this.data.users.getById(req.user._id)
                        .then((dbUser) => {
                            res.render('user/profile', { user: dbUser });
                        });
                });
        } else {
            res.render('user/login', { message: 'Please login first!' });
        }
    }

    signOut(req, res) {
        req.logout();
        return res.redirect('/');
    }

    signUp(req, res) {
        const bodyUser = req.body;
        this.data.users.getByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    res.render('user/register', { error: 'Username already exists!' });
                    return;
                } else {
                    this.data.users.getByEmail(bodyUser.email)
                        .then((dUser) => {
                            if (dUser) {
                                res.render('user/register', { error: 'This email already exists!' });
                                return;
                            }
                        });
                }
                this.data.users.create(bodyUser)
                    .then((User) => {
                        res.redirect('/login');
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