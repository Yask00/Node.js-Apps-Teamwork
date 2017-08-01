const { expect } = require('chai');
// const CryptoJS = require('crypto-js');

const UserData = require('../../../app/data/users.data');
// const Static = require('../../../app/models/static');
const validator = require('../../../app/utils/validator');

describe('Users data tests', () => {
    let usersData;
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
                const username = constraint.username;
                const item = items.find((el) => el.username === username);
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

        usersData = UserData.init(db, Model, validator);
    });

    describe('Method tests', () => {
        it('getByUsername() should return user from collection', (done) => {
            const user1 = {
                username: 'mango',
            };
            const user2 = {
                username: 'mango1',
            };

            items.push(user1, user2);
            usersData.getByUsername(user2.username)
                .then((user) => {
                    expect(user).to.be.deep.equal(user2);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('getByEmail() should return user from collection', (done) => {
           const user3 = {
               email: 'mango1@djeri.bg',
           };
           const user4 = {
               email: 'joro@djeri.bg',
           };

           items.push(user3, user4);
           usersData.getByEmail('mango1@djeri.bg')
               .then((user) => {
                   expect(user).to.be.deep.equal(user3);
                   done();
               })
               .catch((error) => {
                   done(error);
               });
        });
    });
});
