const { expect } = require('chai');
// const CryptoJS = require('crypto-js');

const ServicesData = require('../../../app/data/services.data');

// const BaseData = require('../../../app/data/base/base');

// const Static = require('../../../app/models/static');
const validator = require('../../../app/utils/validator');

describe('Services Data tests', () => {
    let servicesData;
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
                const servicename = constraint.name;
                const item = items.find((el) => el.servicename === servicename);
                return Promise.resolve(item);
            },

            insert(model) {
                items.push(model);
            },

            remove(_id) {
                const index = items.indexOf(_id);
                items.splice(index, 1);
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

        servicesData = ServicesData.init(db, Model, validator);
    });

    describe('Method tests', () => {
        it('getByName() should return order from collection', (done) => {
            const service1 = {
                servicename: 'service1',
            };
            const service2 = {
                servicename: 'service1',
            };

            items.push(service1, service2);
            servicesData.getByName(service2.servicename)
                .then((user) => {
                    expect(user).to.be.deep.equal(service2);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
    });
});
