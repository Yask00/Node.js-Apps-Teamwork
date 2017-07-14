/* globals __dirname */

const async = require('./utils/async');
const validator = require('./validator');
const config = require('./config');
const dbSetup = require('./dbsetup');

async().then(() => require('./db').setup(config.connectionString))
    .then((db) => dbSetup(db, validator))
    .then((db) => {
        const serviceModel = {
            serviceType: 'horse walk',
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmx1CKUrR95QWchNegsHuOAnSOfkotdxw2iheS2DhZ58dbaJzx',
            hotelId: '596659c5e2e43f1e308e6156',
            price: '115,99',
        };
        const userModel = {
            username: 'hysancho',
            password: '123456ff',
            firstName: 'Hasan',
            lastName: 'Nasran',
            phone: '02155455555',
            email: 'hasan.reje@pishki.tr',
            roles: ['admin'],
            roomOrders: [],
            serviceOrders: [],
        };
        db.collection('services')
            .insert(serviceModel)
            .catch((err) => console.log('Service insertion failed!' + err));
        db.collection('users')
            .insert(userModel)
            .catch((err) => console.log('User insertion failed! ' + err));
        db.close();
    })
    .catch((err) => console.log(err));