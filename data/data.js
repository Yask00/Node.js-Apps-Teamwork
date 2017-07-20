const UsersData = require('./users.data');
const HotelsData = require('./hotels.data');

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        hotels: new HotelsData(db),
    });
};

module.exports = { init };

// /* globals __dirname */
// 
// const fs = require('fs');
// const path = require('path');
// 
// const setupData = (db) => {
//     const data = {};
//     fs.readdirSync(__dirname)
//         .filter((file) => file.includes('.data'))
//         .forEach((file) => {
//             const dataName = file.substr(0, file.indexOf('.data'));
//             const modulePath = path.join(__dirname, file);
//             data[dataName] = require(modulePath).getData(db);
//         });
// 
//     return data;
// };
// 

// module.exports = { setupData };