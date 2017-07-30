const { expect } = require('chai');

const BaseData = require('../../../../app/data/base/base');
const validator = require('../../../../app/utils/validator');
const Static = require('../../../../app/models/static');

describe('Base data Tests', () => {
    let baseData;
    let db;
    let Model;
    let collection;
    let items;

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
                const id = constraint._id.toString();
                const item = items.find((el) => el === id);
                return Promise.resolve(item);
            },

            insert(model) {
                items.push(model);
            },
        };

        db = {
            collection(collectionName) {
                collection.name = collectionName;
                return collection;
            },
        };

        Model = {
            name: 'mockedCollection',
            // _isModelValid() {
            //     return true;
            // },
        };
        baseData = new BaseData(db, Model, validator);
    });

    describe('Methods Tests', () => {

        it('expect getAll() to return all', (done) => {
            const expected = [1, 2, 3, 4];
            items.push(...expected);

            baseData.getAll()
                .then((data) => {
                    expect(data).to.be.deep.equal(expected);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('getById() should return one collection item', (done) => {
            items = [
                '5906f669b04a7f1dd47d7a31',
                '5906f669b04a7f1dd47d7a32',
                '5906f669b04a7f1dd47d7a33',
                '5906f669b04a7f1dd47d7a34',
                '5906f669b04a7f1dd47d7a35',
            ];

            const expected = '5906f669b04a7f1dd47d7a34';

            baseData.getById(expected)
                .then((data) => {
                    expect(data).to.be.deep.equal(expected);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('getById() should return undefined if item does not exist', (done) => {
            items = [
                '5906f669b04a7f1dd47d7a31',
                '5906f669b04a7f1dd47d7a32',
                '5906f669b04a7f1dd47d7a33',
                '5906f669b04a7f1dd47d7a34',
                '5906f669b04a7f1dd47d7a35',
            ];

            const expected = '5906f669b04a7f1dd47d7a41';

            baseData.getById(expected)
                .then((data) => {
                    expect(data).to.be.an('undefined');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('create() should add element to the collection', () => {
            const expected = '5906f669b04a7f1dd47d7a41';

            baseData.create(expected);

            expect(items).to.be.deep.equal([expected]);
        });

        it('create() should reject with invalid data if the model is not valide', (done) => {
            const expected = '5906f669b04a7f1dd47d7a41';

            Static.isValid = () => {
                return false;
            };

            baseData.create(expected)
                .then(() => {
                    done(new Error('Expected method to reject.'));
                })
                .catch((err) => {
                    expect(err).to.be.deep.equal('Model validation failed!');
                    done();
                })
                .catch(done);
        });
    });
});

