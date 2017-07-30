const { expect } = require('chai');
// const CryptoJS = require('crypto-js');

const RoomsData = require('../../../app/data/rooms.data');
const Static = require('../../../app/models/static');
const validator = require('../../../app/utils/validator');

describe('Rooms Data tests', () => {
    let roomsData;
    let items;
    let collection;
    let db;
    let Model;

    beforeEach(() => {
        items = [];

        collection = {
            name: '',
            find() {
                return {
                    toArray() {
                        return Promise.resolve(items);
                    },
                };
            },

            findOne(constraint) {
                const roomname = constraint.name;
                const item = items.find((el) => el.roomname === roomname);
                return Promise.resolve(item);
            },

            insert(model) {
                items.push(model);
            },

            remove(_id) {
                const index = items.indexOf(_id);
                items.splice(index, 1);
            },

            update(p1, p2) {
                return Promise.resolve([p1, p2]);
            },
        };

        db = {
            collection(collectionName) {
                collection.name = collectionName;
                return collection;
            },
        };

        Model = {
            name: 'Mocked',
        };

        roomsData = RoomsData.init(db, Model, validator);
    });

    describe('Method tests', () => {
        it('getByName() should return order from collection', (done) => {
            const room1 = {
                roomname: 'room1',
            };
            const room2 = {
                roomname: 'room2',
            };

            items.push(room1, room2);
            roomsData.getByName(room2.roomname)
                .then((user) => {
                    expect(user).to.be.deep.equal(room2);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
    });
});
