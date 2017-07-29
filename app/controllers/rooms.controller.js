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
            }).catch((err) => res.render('user/error', { error: err }));
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

    getCreateForm(req, res) {
        this.data.hotels.getAll()
            .then((hotels) => {
                return res.render('room/form', {
                    message: req.flash('Room success'),
                    error: req.flash('Room error'),
                    user: req.user,
                    hotels: hotels,
                });
            });
    }

    getUpdateForm(req, res) {
        this.data.rooms.getAll()
            .then((rooms) =>
                res.render('room/update', {
                    message: req.flash('Room success'),
                    error: req.flash('Room error'),
                    user: req.user,
                    rooms: rooms,
                }));
    }

    createRoom(req, res) {
        return this.data.rooms.create(req.body)
            .then((result) => {
                const dbRoom = result.ops[0];
                this.data.hotels.addToCollection(dbRoom, 'rooms');
                req.flash('Room success',
                    `Стая ${dbRoom.roomType} e успешно добавена`);
                return this.getCreateForm(req, res);
            }).catch((err) => {
                req.flash('Room error',
                    'Записът неуспешен поради невалидни данни!');
                return this.getCreateForm(req, res);
            });
    }

    update(req, res) {
        let dbRoom;
        return this.data.rooms.update(req.params.id, req.body)
            .then(() => {
                return this.data.rooms.getById(req.params.id);
            }).then((room) => {
                dbRoom = room;
                return this.data.hotels.updateCollection(dbRoom, 'rooms');
            }).then(() => {
                req.flash('Room success',
                    `Стая ${dbRoom.roomType} e успешно промененa`);
                return this.getUpdateForm(req, res);
            }).catch((err) => {
                req.flash(
                    'Room error', 'Неуспешен запис: невалидни данни!');
                return this.getUpdateForm(req, res);
            });
    }
}

const init = (data) => {
    return new RoomsController(data);
};

module.exports = { init };