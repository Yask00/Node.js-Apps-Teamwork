/* globals __dirname */

const async = require('./utils/async');
const config = require('./config');
const initData = require('./banana');

async().then(() => require('./db').setup(config.connectionString))
    .then((db) => initData(db))
    .then((result) => {
        console.log(result);
    }).catch((err) => console.log(err));