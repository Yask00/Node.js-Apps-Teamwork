const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../app/data/base/base');

describe('Base data Tests', () => {
    const db = {
        collection: () => { },
    };

    let hotels = [];
    let Model = null;
    const validator = null;
    let data = null;

    const toArray = () => {
        return Promise.resolve(hotels);
    };

    const find = () => {
        return {
            toArray,
        };
    };

    describe('data Base Tests', () => {

        beforeEach(() => {
            hotels = [1, 2, 3, 4, 5];
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { find };
                });

            Model = class {

            };

            data = new BaseData(db, Model, validator);
        });

        it('expect getAll() to return all', () => {
            data.getAll()
                .then((models) => {
                    expect(models).to.deep.equal(hotels);
                });
        });
    });
});

