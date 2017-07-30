const { expect } = require('chai');
// const CryptoJS = require('crypto-js');

const CommentsData = require('../../../app/data/comments.data');
const Static = require('../../../app/models/static');
const validator = require('../../../app/utils/validator');

describe('Comments Data tests', () => {
    let commentsData;
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
                const username = constraint.name;
                const item = items.find((el) => el.username === username);
                return Promise.resolve(item);
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

        commentsData = CommentsData.init(db, Model, validator);
    });

    describe('Method tests', () => {
        it('getByName() should return user with this name from collection', (done) => {
            const comment1 = {
                username: 'mango',
            };
            const comment2 = {
                username: 'mango1',
            };

            items.push(comment1, comment2);
            commentsData.getByName(comment2.username)
                .then((user) => {
                    expect(user).to.be.deep.equal(comment2);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
    });
});
