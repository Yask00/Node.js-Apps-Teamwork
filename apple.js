const async = require('./utils/async');
const config = require('./config');
const Hotel = require('./models/hotel.model');
const validator = require('./validator');

const fs = require('fs');
const path = require('path');

// async().then(() => require('./db').setup(config.connectionString)
//     .then((db) => {
//         const act = require('./act')(db);
//         act.setValidation(Hotel, validator)
//             .then(() => db.close())
//             .catch((err) => {
//                 console.log(err);
//                 db.close();
//             });
//     })
// );

async().then(() => require('./db').setup(config.connectionString)
    .then((db) => {
        initData(db);
        // const act = require('./act')(db);
        // act.setValidation(Hotel, validator)
        //     .then(() => db.close())
        //     .catch((err) => {
        //         console.log(err);
        //         db.close();
        //     });
    })
);

/* globals __dirname */


const initData = (db) => {
    const act = require('./act')(db);
    const collections = [];
    fs.readdirSync(__dirname + '/models')
        .filter((file) => file.includes('.model'))
        .forEach((file) => {
            const collection = file.substr(0, file.indexOf('.js'));
            db.listCollections({ name: collection.substr(0, collection.indexOf('.model')) + 's' })
                .next(function(err, collinfo) {
                    if (collinfo) {
                        const model = require(__dirname + '/models/' + collection);

                        act.setValidation(model, validator);
                    } else {
                        const model = require(__dirname + '/models/' + collection);
                        act.createCollection(model, validator);
                    }
                });
        });
};


// const checkCollection = (db, collection name) => {

// }
// module.exports = { initData };