/* eslint-disable no-console */

const async = require('./utils/async');

const config = require('./config'); // PORT and ConnectionString

async()
    .then(() => require('./db').setup(config.connectionString)) // connect to db with --> return db
    .then((db) => require('./data').init(db))
    // categories: new CategoriesData(db), --> from /data/categories.data.js
    // users: new UsersData(db),
    .then((data) => require('./app').init(data))
    // app = express()
        // hass app config
        // has auth config
        // attach routers to app and data

    .then((app) => {
        app.listen(config.PORT, () =>
            console.log(`Magic happends at :${config.PORT} at database ${config.connectionString}`));
    })
    .catch((err) => {
        console.log(err);
    });