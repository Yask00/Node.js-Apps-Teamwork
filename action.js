module.exports = function(db) {
    return {
        setValidation() {
            return db.command({
                collMod: 'contacts',
                validator: {
                    $and: [
                        { phone: { $type: 'string' } },
                        { email: { $regex: /@mongodb\.com$/ } },
                        { status: { $in: ['Unknown', 'Incomplete'] } },
                    ],
                },
                validationLevel: 'strict',
                validationAction: 'error',
            });
        },
        createCollection(name) {
            return db.createCollection(name, {
                validator: {
                    $and: [
                        { phone: { $type: 'string' } },
                        { email: { $regex: /@mongodb\.com$/ } },
                        { status: { $in: ['Unknown', 'Incomplete'] } },
                    ],
                },
                validationAction: 'error',
            });
        },
    };
};