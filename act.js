module.exports = function(db) {
    return {
        setValidation(Model, validator) {
            const collection = Model.name.toLowerCase() + 's';
            const validationOptions = {
                validator: {
                    $and: [],
                },
                validationLevel: 'strict',
                validationAction: 'error',
            };
            const options = {};
            const model = new Model(options);
            Object.keys(model)
                .forEach((prop) => {
                    if (validator[prop]) {
                        validationOptions.validator.$and.push({
                            [prop]: validator[prop],
                        });
                        console.log(`Databse validation ${prop} for collection ${collection} set!`);
                    }
                });

            return db.command({
                collMod: collection,
                validator: validationOptions.validator,
            });
        },
        // createCollection(name) {
        //     return db.createCollection(name, {
        //         validator: {
        //             $and: [
        //                 { phone: { $type: 'string' } },
        //                 { email: { $regex: /@mongodb\.com$/ } },
        //                 { status: { $in: ['Unknown', 'Incomplete'] } },
        //             ],
        //         },
        //         validationAction: 'error',
        //     });
        // },
    };
};