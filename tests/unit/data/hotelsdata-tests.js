const { expect } = require('chai');
// const CryptoJS = require('crypto-js');

const HotelsData = require('../../../app/data/hotels.data');
// const Static = require('../../../app/models/static');
const validator = require('../../../app/utils/validator');

describe('Hotels Data tests', () => {
    let hotelsData;
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
                const hotelname = constraint.name;
                const item = items.find((el) => el.hotelname === hotelname);
                return Promise.resolve(item);
            },

            insert(model) {
                items.push(model);
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

        hotelsData = HotelsData.init(db, Model, validator);
    });

    describe('Method tests', () => {
        it('getByName() should return hotel from collection', (done) => {
            const hotel1 = {
                hotelname: 'hotel1',
            };
            const hotel2 = {
                hotelname: 'hotel2',
            };

            items.push(hotel1, hotel2);
            hotelsData.getByName(hotel2.hotelname)
                .then((hotel) => {
                    expect(hotel).to.be.deep.equal(hotel2);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
    });
});
