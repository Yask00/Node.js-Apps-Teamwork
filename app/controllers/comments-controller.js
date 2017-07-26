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
        return res.render('comments/form', {
            user: req.user,
        });
    }

    createComment(req, res) {
        console.log(req.body);
        this.data.comments.create(req.body)
            .then((dbComment) => {
                req.flash('Comment created succesfuly',
                    `Коментарът ви e успешно създаден, goto /comments`);
                res.render('comments/form', {
                    message: req.flash('Comment created succesfuly'),
                    user: req.user,
                    comment: req.body,
                });
            }).catch((err) => {
                req.flash('Failed creation',
                    'Записът e неуспешен поради невалидни данни!');
                res.render('comments/form', {
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
