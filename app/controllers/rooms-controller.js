class RoomsController {
    constructor(data) {
        this.data = data;
    }

    getAllRooms(req, res) {
        this.data.rooms.getAll()
            .then((rooms) => {
                res.render('room/all', {
                    context: rooms,
                    user: req.user,
                });
            })
            .catch((err) => res.render('user/error', { error: err }));
    }

    getCreateForm(req, res) {
        return res.render('room/roomForm', {
            user: req.user,
            message: req.flash('Failed creation'),
        });
    }

    createRoom(req, res) {
        this.data.rooms.create(req.body)
            .then((dbRoom) => {
                req.flash('Room created succesfuly',
                    `Вашата тип стая беше успешно създаден, goto /allrooms`);

                res.render('room/roomForm', {
                    room: dbRoom,
                    user: req.user,
                    message: req.flash('Room created succesfuly'),
                 });
            })
            .catch((err) => {
                req.flash('Failed creation',
                    'Записът неуспешен поради невалидни данни!');
                res.render('room/roomForm', {
                    message: req.flash('Failed creation'),
                    user: req.user,
                });
            });
    }
}

const init = (data) => {
    return new RoomsController(data);
};

module.exports = { init };
