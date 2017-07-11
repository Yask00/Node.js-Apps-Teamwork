module.exports = function(db) {
    return {
        setValidation(Model, validator) {
            const validationOptions = getValidationOptions(Model, validator);
            return db.command({
                collMod: validationOptions.collection,
                validator: validationOptions.v.validator,
                validationLevel: validationOptions.v.validationLevel,
                validationAction: validationOptions.v.validationAction,
            });
        },
        createCollection(Model, validator) {
            const validationOptions = getValidationOptions(Model, validator);
            return db.createCollection(
                validationOptions.collection,
                validationOptions.v);
        },
    };
};

const getValidationOptions = (Model, validator) => {
    const collection = Model.name.toLowerCase() + 's';
    const validationOptions = {
        validator: {
            $and: [{ phone: { $type: 'string' } }],
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
                //console.log(`Databse validation ${prop} for collection ${collection} set!`);
            }
        });
    return {
        collection,
        v: validationOptions,
    };
};