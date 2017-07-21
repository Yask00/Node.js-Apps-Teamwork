/* globals __dirname */

const fs = require('fs');
const path = require('path');

const setupData = (db, validator) => {
    const data = {};
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.data'))
        .forEach((file) => {
            const dataName = file.substr(0, file.indexOf('.data'));
            const modelName = (dataName.substr(0, (dataName.length - 1)) + '.model');
            const Model = require((__dirname + '/../models/' + modelName));
            const modulePath = path.join(__dirname, file);
            data[dataName] = require(modulePath).init(db, Model, validator);
        });
    return Promise.resolve(data);
};

module.exports = { setupData };