let driver = null;

const ui = require('./ui');

const async = require('../../../app/utils/async');

const loginUser = (username, password) => {
    return async()
        .then(() => ui.click('#homeBtn'))
        .then(() => ui.click('#loginBtn'))
        .then(() => ui.setValue('input[name="username"]', username))
        .then(() => ui.setValue('input[name="password"]', password))
        .then(() => ui.click('.btn'));
        //.then(() => ui.click('#nav-btn-item-add'));
};

const registerUser = (username, firstname, lastname, phonenumber, email, password) => {
    return async()
        .then(() => ui.click('#registerBtn'))
        .then(() => ui.setValue('input[name="username"]', username))
        .then(() => ui.setValue('input[name="firstName"]', firstname))
        .then(() => ui.setValue('input[name="lastName"]', lastname))
        .then(() => ui.setValue('input[name="phone"]', phonenumber))
        .then(() => ui.setValue('input[name="email"]', email))
        .then(() => ui.setValue('input[name="password"]', password))
        .then(() => ui.click('form button'));
        //.then(() => ui.click('#nav-btn-item-add'));
};

module.exports = {
    setDriver(_driver) {
        driver = _driver;
        ui.setDriver(driver);
    },

    loginUser,
    registerUser,
};
