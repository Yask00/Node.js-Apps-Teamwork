class CommentsController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        this.data.comments.getAll()
            .then((comments) => {
                res.render('comments/all', {
                    context: comments,
                    user: req.user,
                });
            })
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getCreateForm(req, res) {
        this.data.hotels.getAll()
        .then((hotels) => {
            return res.render('comments/form', {
                user: req.user,
                hotels,
            });
        });
    }

    createComment(req, res) {
        let dbComment;
        this.data.comments.create(req.body)
            .then((result) => {
                dbComment = result.ops[0]; // create(req.body)
                return this.data.hotels.addToCollection(dbComment);
            })
            .then(() => {
                req.flash('Comment created succesfuly',
                    `Коментарът ви e успешно създаден, goto /comments`);
                res.render('user/profile', {
                    message: req.flash('Comment created succesfuly'),
                    user: req.user,
                });
            })
            .catch((err) => {
                req.flash('Failed creation',
                    'Записът e неуспешен поради невалидни данни!');
                res.render('user/profile', {
                    message: req.flash('Failed creation'),
                    user: req.user,
                });
            });
    }
}

const init = (data) => {
    return new CommentsController(data);
};

module.exports = { init };
