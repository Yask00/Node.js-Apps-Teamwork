/* globals __dirname */ // unused

const async = require('./utils/async');
const validator = require('./validator');
const config = require('./config');
const dbSetup = require('./dbsetup');

async().then(() => require('./db').setup(config.connectionString))
    .then((db) => dbSetup(db, validator))
    .then((db) => {
        // const serviceModel = {
        //     serviceType: 'horse walk',
        //     imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmx1CKUrR95QWchNegsHuOAnSOfkotdxw2iheS2DhZ58dbaJzx',
        //     hotelId: '596659c5e2e43f1e308e6156',
        //     price: '115,99',
        // };
        const userModel1 = {
            username: 'hysancho',
            password: '123456ff',
            firstName: 'Hasan',
            lastName: 'Nasran',
            phone: '02155455555',
            email: 'hasan.reje@pishki.tr',
            roles: ['default'],
            roomOrders: [],
            serviceOrders: [],
        };
        const userModel2 = {
            username: 'bok',
            password: 'bokbok',
            firstName: 'Gospod',
            lastName: 'Bog',
            phone: '02155455554',
            email: 'gospod@bog.rai',
            roles: ['admin'],
            roomOrders: [],
            serviceOrders: [],
        };

        const hotelModel1 = {
            name: 'Михайловата къща Буйновци',
            phone: '0123456789',
            imageURL: 'http://www.bgvakancia.com/common_images/offers/2445/thumb_96ae22225500b89680d0d490f65b7eae.jpg',
            description: 'Михайловата къща" е разположена в красивото балканско село Буйновци, в Балкана, на 11 км от гр. Елена. ',
            location: 'Еленски Балкан',
            lattitude: '22',
            longitude: '22',
        };

        const hotelModel2 = {
            name: 'Къща Станкови Цигов чарк',
            phone: '0123456781',
            imageURL: 'http://www.bgvakancia.com/common_images/offers/812/thumb_6d219cd52d0596c2ab6c443615ba76d3.jpg',
            description: 'Къща за гости "СТАНКОВИ" се намира в невероятния планински курорт Цигов Чарк край язовир Батак.',
            location: 'Централен Балкан',
            lattitude: '21',
            longitude: '21',
        };

        // db.collection('services')
        //     .insert(serviceModel)
        //     .catch((err) => console.log('Service insertion failed!' + err));

        db.collection('users')
            .insert(userModel1)
            .catch((err) => console.log('User insertion failed! ' + err));

        db.collection('users')
            .insert(userModel2)
            .catch((err) => console.log('User insertion failed! ' + err));

        db.collection('hotels')
            .insert(hotelModel1)
            .catch((err) => console.log('Hotel insertion failed! ' + err));

        db.collection('hotels')
            .insert(hotelModel2)
            .catch((err) => console.log('Hotel insertion failed! ' + err));
        db.close();
    })
    .catch((err) => console.log(err));

