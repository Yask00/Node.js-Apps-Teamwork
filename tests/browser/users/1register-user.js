/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const ui = require('../utils/ui');
const userUtils = require('../utils/user-utils');
const webdriver = require('selenium-webdriver');

const async = require('../../../app/utils/async');

describe('USERs Routes', () => {
    let driver = null;

    // let driver =
    //     new webdriver.Builder()
    //         .build();

    const appUrl = 'localhost:3002';

    const username = 'user1';
        const firstname = 'user';
        const lastname = 'user';
        const phonenumber = '123456789';
        const email = 'user1@abv.bg';
        const password = '1234';
        const successRegisterMsg = 'Вие се регистрирахте успешно, моля влезте';
    
    before(() => {
        async()
            .then(() => {
                return userUtils
                    .registerUser(username, firstname, lastname, phonenumber, email, password);
            });
    });

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
        // return driver.get(appUrl);
    });

    afterEach(() => {
        return driver.quit();
    });

    describe('Register User', () => {

        it('Expect success registration Message', (done) => {
            driver.get(appUrl)
                .then(() => ui.getText('.flash-message-green'))
                .then((btnText) => {
                    console.log(btnText);
                    expect(btnText).to.equal(successRegisterMsg);
                    done();
                });
      });
    });
});

