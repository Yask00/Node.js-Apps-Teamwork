const { MongoClient } = require('mongodb');

const connect = () => {
    return MongoClient.connect('mongodb://localhost/todos');
};

module.exports = { connect };