/* globals __dirname */

const async = require('../utils/async');
const fs = require('fs');
// const path = require('path');

const dbSetup = (db, validator) => {
    return new Promise((res, rej) => {
        async()
        .then(() => readFolder())
            .then((collections) => updateDatabase(db, collections, validator))
            .then((result) => {
                db.collection('users')
                    .createIndex({ 'username': 2 }, { unique: true });
                db.collection('users')
                    .createIndex({ 'email': 2 }, { unique: true });
                res(db);
            }).catch((err) => console.log(err));
    });
};

const readFolder = () => {
    const collections = fs.readdirSync(__dirname + '/../models/')
        .filter((file) => file.includes('.model'));
    return Promise.resolve(collections);
};

const updateDatabase = (db, collections, validator) => {
    const act = require('./dbaction')(db);
    let count = 0;
    const counter = collections.length;
    return new Promise((res, rej) => {
        collections
            .forEach((file) => {
                const collection = file.substr(0, file.indexOf('.js'));
                updateCollection(db, collection, act, validator)
                    .then((result) => {
                        console.log(result);
                        count++;
                        if (count === counter) {
                            res('Database updated!');
                        }
                    });
            });
    });
};

const checkCollection = (db, collection) => {
    return new Promise((res, rej) => {
        db.listCollections({
                name: (collection.substr(
                        0, collection
                        .indexOf('.model')) + 's')
                    .toLowerCase(),
            })
            .next((err, collinfo) => {
                res(collinfo);
            });
    });
};

const updateCollection = (db, collection, act, validator) => {
    return new Promise((res, rej) => {
        async()
        .then(() => checkCollection(db, collection))
            .then((result) => {
                if (result) {
                    const model =
                        require(__dirname + '/../models/' + collection);
                    act.setValidation(model, validator)
                        .then(() => res(`Db validations of ${collection} set!`))
                        .catch((err) => rej(err));
                } else {
                    const model =
                        require(__dirname + '/../models/' + collection);
                    act.createCollection(model, validator)
                        .then(() => res(
                            `Collection ${collection} created and validated!`))
                        .catch((err) => rej(err));
                }
            });
    });
};

module.exports = dbSetup;
