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
        if (!req.single) {
            return this.data.rooms.getAll()
                .then((rooms) =>
                    res.render('room/update', {
                        message: req.flash('Room success'),
                        error: req.flash('Room error'),
                        user: req.user,
                        rooms: rooms,
                    }));
        }
        return res.render('room/update', {
            message: req.flash('Hotel success'),
            error: req.flash('Hotel error'),
            user: req.user,
            roomId: req.params.id,
        });
    }

    createRoom(req, res) {
        let body;
        return this.data.hotels.getById(req.body.hotelId)
            .then((dbHotel) => {
                body = req.body;
                body.hotelName = dbHotel.name;
            }).then(() => {
                return this.data.rooms.create(body);
            }).then((result) => {
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
        const single = req.body.single;
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
                if (single) {
                    return this.getRoomDetails(req, res);
                }
                return this.getUpdateForm(req, res);
            }).catch((err) => {
                req.flash(
                    'Room error', 'Неуспешен запис: невалидни данни!');
                if (single) {
                    return this.getRoomDetails(req, res);
                }
                return this.getUpdateForm(req, res);
            });
    }
}

const init = (data) => {
    return new RoomsController(data);
};

module.exports = { init };
