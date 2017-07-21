const async = require('./app/utils/async');
const config = require('./app/config');
const validator = require('./app/utils/validator');

async().then(() => require('./app/db').setup(config.connectionString))
    .then((db) => require('./app/dbsetup')(db, validator))
    .then((db) => require('./app/data').setupData(db, validator)
        .then((data) => require('./app/app').init(data, config, db)))
    .then((app) => app.listen(config.PORT, () =>
        console.log(`CORS-enabled app running on http://localhost:${config.PORT}`)));

