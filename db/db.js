const { MongoClient } = require('mongodb');

const setup = (connectionString) => {
    return MongoClient.connect(connectionString)
    .then((db) => {
            console.log('Databases connected');
            return db;
        });
};

module.exports = { setup };