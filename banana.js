/* globals __dirname */

const Static = require('./models/static');
const async = require('./utils/async');
const validator = require('./validator');
const fs = require('fs');
const path = require('path');

const initData = (db) => {
    return new Promise((res, rej) => {
        async()
        .then(() => readFolder())
            .then((collections) => updateDatabase(db, collections))
            .then((result) => {
                const model = {
                    serviceType: 'horse walk',
                    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmx1CKUrR95QWchNegsHuOAnSOfkotdxw2iheS2DhZ58dbaJzx',
                    hotelId: '596659c5e2e43f1e308e6156',
                    price: '115,99',
                };
                console.log(Static.isValid(model));
                db.collection('services')
                    .insert(model).catch((err) => console.log('К`ъв Петров търсиш бе идиот, ние нямаме телефон!'));
                res(result);
                db.close();
            });
    });
};

const readFolder = () => {
    const collections = fs.readdirSync(__dirname + '/models')
        .filter((file) => file.includes('.model'));
    return Promise.resolve(collections);
};

const updateDatabase = (db, collections) => {
    const act = require('./dbAction')(db);
    let count = 0;
    const counter = collections.length;
    return new Promise((res, rej) => {
        collections
            .forEach((file) => {
                const collection = file.substr(0, file.indexOf('.js'));
                updateCollection(db, collection, act)
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

const updateCollection = (db, collection, act) => {
    return new Promise((res, rej) => {
        async()
        .then(() => checkCollection(db, collection))
            .then((result) => {
                if (result) {
                    const model = require(__dirname + '/models/' + collection);
                    act.setValidation(model, validator)
                        .then(() => res(`Db validations of ${collection} set!`))
                        .catch((err) => rej(err));
                } else {
                    const model = require(__dirname + '/models/' + collection);
                    act.createCollection(model, validator)
                        .then(() => res(`Collection ${collection} created and validated!`))
                        .catch((err) => rej(err));
                }
            });
    });
};

module.exports = initData;