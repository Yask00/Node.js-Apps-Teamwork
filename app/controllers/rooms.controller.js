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
        this.data.hotels.getAll()
            .then((hotels) => {
                return res.render('room/form', {
                    user: req.user,
                    hotels,
                });
            });
    }

    createRoom(req, res) {
        let dbRoom;
        this.data.rooms.create(req.body)
            .then((result) => {
                dbRoom = result.ops[0];
                return this.data.hotels.addToCollection(dbRoom);
            })
            .then(() => {
                req.flash('Room created succesfuly',
                    `Стая тип ${dbRoom.roomType} беше успешно създаденa`);
                res.render('room/details', {
                    room: dbRoom,
                    user: req.user,
                    message: req.flash('Room created succesfuly'),
                });
            })
            .catch((err) => {
                req.flash('Failed creation',
                    'Записът неуспешен поради невалидни данни!');
                res.render('room/form', {
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

    getUpdateForm(req, res) {
        return res.render('room/update', {
            user: req.user,
            roomId: req.params.id,
        });
    }

    update(req, res) {
        this.data.rooms.update(req.body)
            .then(() => {
                return this.data.rooms.getById(req.body.roomId);
            }).then((dbRoom) => {
                this.data.hotels.updateCollection(dbRoom)
                    .then(() => res.render('room/details', { room: dbRoom }));
            }).catch((err) => {
                req.flash(
                    'Invalid data', 'Неуспешен запис: невалидни данни!');
                res.render('room/update', {
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
