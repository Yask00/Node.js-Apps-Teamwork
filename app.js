const { connect } = require('./db');

function get() {
    return new Promise((res, rej) => {
        connect().then((db) => {
            res(db);
        });
    })
};

get().then((data) => {
    data.listCollections({ name: 'contacts' })
        .next(function(err, collinfo) {
            if (collinfo) {
                console.log('exists!');
            } else {
                console.log('does not exist!');
            }
        });
    data.close();
}).catch((err) => {
    console.log(err);
    data.close();
});