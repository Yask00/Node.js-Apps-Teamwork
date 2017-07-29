// USING SUPER TEST FOR ROUTERS

// SHOULD BE FIXED 

// const request = require('supertest');
// const validator = require('../../app/utils/validator');
// const config = require('../../app/config');
// 
// describe('Integration with Supertest Hotels tests', () => {
//     let app = null;
// 
//     beforeEach(() => {
//         return Promise.resolve()
//             .then(() => require('../../app/db').setup(config.connectionString))
//             .then((db) => require('../../app/dbsetup')(db, validator))
//             .then((db) => require('../../app/data').setupData(db, validator))
//             .then((db, data) => require('../../app/app/').init(data, config, db))
//             .then((_app) => {
//                 app = _app;
//             });
//     });
// 
//     describe('GET /allhotels', () => {
//         it('expect to return 200', (done) => {
//             request(app)
//                 .get('/allhotels')
//                 .expect(200)
//                 .end((err, res) => {
//                     if (err) {
//                         return done(err);
//                     }
// 
//                     return done();
//                 });
//         });
//     });
// });
