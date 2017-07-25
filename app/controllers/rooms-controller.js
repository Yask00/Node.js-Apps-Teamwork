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

    getRoomDetails(req, res) {
        this.data.rooms.getById(req.params.id)
            .then((dbRoom) =>
                res.render('room/details', {
                    room: dbRoom,
                    user: req.user,
                }))
            .catch((err) => {
                res.render('user/error', { error: err });
            });
    }

    getAddForm(req, res) {
        return res.render('room/roomForm', {
            user: req.user,
            hotelId: req.params.id,
        });
    }

    getUpdateForm(req, res) {
        return res.render('room/updateForm', {
            user: req.user,
            hotelId: req.params.id,
        });
    }

    update(req, res) {
        this.data.rooms.update(req.body.id, req.body)
            .then(() => {
                this.data.rooms.getById(req.body.id)
                    .then((dbRoom) => {
                        res.render('room/details', { room: dbRoom });
                    });
            }).catch((err) => {
                req.flash(
                    'Invalid data', 'Неуспешен запис: невалидни данни!');
                res.render('room/updateform', {
                    user: req.user,
                    roomId: req.body.id,
                    message: req.flash('Invalid data'),
                });
            });
    }
}

const init = (data) => {
    return new RoomsController(data);
};

module.exports = { init };
