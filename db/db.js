const { MongoClient } = require('mongodb');

const setup = (connectionString) => {
    return MongoClient.connect(connectionString);
};

module.exports = { setup };