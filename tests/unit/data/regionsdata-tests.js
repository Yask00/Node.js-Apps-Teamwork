const { expect } = require('chai');
// const CryptoJS = require('crypto-js');

const RegionsData = require('../../../app/data/regions.data');
// const Static = require('../../../app/models/static');
const validator = require('../../../app/utils/validator');

describe('Regions Data tests', () => {
    let regionsData;
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
                const regionname = constraint.name;
                const item = items.find((el) => el.regionname === regionname);
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

        regionsData = RegionsData.init(db, Model, validator);
    });

    describe('Method tests', () => {
        it('getByName() should return order from collection', (done) => {
            const region1 = {
                regionname: 'region1',
            };
            const region2 = {
                regionname: 'region2',
            };

            items.push(region1, region2);
            regionsData.getByName(region2.regionname)
                .then((user) => {
                    expect(user).to.be.deep.equal(region2);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
    });
});
