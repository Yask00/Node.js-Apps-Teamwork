// /* eslint-disable no-unused-expressions */
// const { expect } = require('chai');
// const { setupDriver } = require('../utils/setup-driver');
// const ui = require('../utils/ui');
// const userUtils = require('../utils/user-utils');
// const webdriver = require('selenium-webdriver');

// const async = require('../../../app/utils/async');

// describe('USERs Routes', () => {
//     let driver = null;

//     // let driver =
//     //     new webdriver.Builder()
//     //         .build();

//     const appUrl = 'localhost:3002';

//     const username = 'user1';
//     const password = '1234';
//     const profileMsg =' Потребителско име: user1';

//     before(() => {
//         async()
//             .then(() => {
//                 return userUtils
//                     .loginUser(username, password);
//             });
//     });

//     beforeEach(() => {
//         driver = setupDriver('chrome');
//         ui.setDriver(driver);
//         // return driver.get(appUrl);
//     });

//     afterEach(() => {
//         return driver.quit();
//     });

// describe('Register User', () => {
//         it('Expect user login try successfull', (done) => {
//             driver.get(appUrl)
//                 .then(() => ui.getTexts('.panel-title'))
//                 .then((text) => {
//                     console.log(text);
//                     expect(text).to.equal(profileMsg);
//                     done();
//                 });
//         });
//      });
// });


