/* eslint-disable no-unused-expressions */


const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const webdriver = require('selenium-webdriver');

describe('Selenium TESTS for HomePage', () => {
    let driver = null;
    const appUrl = 'localhost:3002';
    const appTitle = 'DreamRest';
    const h1Title = 'DREAM REST';

    beforeEach(() => {
        // setup driver
        driver = setupDriver('chrome');
    });

    afterEach(() => {
        return driver.quit();
    });


    it('Selenium expect application to have a title DreamRest', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.getTitle();
            })
            .then((title) =>{
                console.log(`Title of the application is ${title}`);
                expect(title).to.equal(appTitle);
                done();
            });
    });

    it('Selenium expect application to have h1 element with text DREAM REST', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('h1')
                );
            })
            .then((el) =>{
                return el.getText();
            })
            .then((text) => {
                console.log(`H1 the application is ${text}`);
                expect(text).to.contain(h1Title);
                done();
            });
    });
});
