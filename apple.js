const async = require('./utils/async');
const config = require('./config');
const Hotel = require('./models/hotel.model');
const validator = require('./validator');

async().then(() => require('./db').setup(config.connectionString)
    .then((db) => {
        const act = require('./act')(db);
        act.setValidation(Hotel, validator)
            .then(() => db.close())
            .catch((err) => {
                console.log(err);
                db.close();
            });
    })
);