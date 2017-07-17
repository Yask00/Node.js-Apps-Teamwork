'use strict';

// later will rewrite it, to use the real database
const db = {
    users: [
        { _id: 1, username: 'gosho', password: 'gosho' },
        { _id: 2, username: 'pesho', password: 'pesho' },
    ],
};

// simulate asynchronous operations so it resembles using a real database
module.exports = {
     findUserById(id) {
        const user = db.users.find(u => u._id === id);

        return Promise.resolve(user || null);
    },
    findUserByCredentials(username, password) {
        const user = db.users.find((u) => u.username === username && u.password === password);

        return Promise.resolve(user || null);
    },
    
};
