const { expect } = require('chai');
// const CryptoJS = require('crypto-js');

const OrdersData = require('../../../app/data/orders.data');
const Static = require('../../../app/models/static');
const validator = require('../../../app/utils/validator');

describe('Orders Data tests', () => {
    let ordersData;
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
                const ordername = constraint.name;
                const item = items.find((el) => el.ordername === ordername);
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

        ordersData = OrdersData.init(db, Model, validator);
    });

    describe('Method tests', () => {
        it('getByName() should return order from collection', (done) => {
            const order1 = {
                ordername: 'order1',
            };
            const order2 = {
                ordername: 'order2',
            };

            items.push(order1, order2);
            ordersData.getByName(order2.ordername)
                .then((user) => {
                    expect(user).to.be.deep.equal(order2);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
        
        it('find By id and remove() from orders collection', () => {
            const order1 = {
                _id: '597c47fa74e8960bd4b622e1',
            };
            items.push(order1);

            ordersData.remove(order1._id);
            expect(items).to.be.deep.equal([]);
        });
    });
});
