// NOT WORKIG
// MISSING USER IN req - res.js


const { expect } = require('chai');

const { init } = require('../../../app/controllers/hotels.controller');

describe('Hotels controller', () => {
    let data = null;
    let controller = null;
    const hotels = [1, 2, 3, 4];

    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            hotels: {
                getAll() {
                    return Promise.resolve(hotels);
                },
            },
        };

        controller = init(data);
        req = require('../../unit/req-res').getRequestMock();
        res = require('../../unit/req-res').getResponseMock();
    });

    it('expect get all to return all hotels', () => {
        controller.getAll(req, res)
            .then((result) => {
                expect(res.context).to.be.deep.equal({
                    context: hotels,
                });
                expect(res.viewName).to.be.equal('hotel/all');
            });
    });
});