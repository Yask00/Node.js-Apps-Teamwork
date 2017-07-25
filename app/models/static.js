class Static {
    static isValid(model, validator) {
        let valid = true;
        if (typeof model === 'undefined') {
            return !valid;
        }

        Object.keys(model)
            .forEach((prop) => {
                const test = validator[prop];
                const match = model[prop];
                if (test) {
                    if (Object.prototype.toString.call(test) ===
                        '[object Array]') {
                        if (!test.find((x) => x === match)) {
                            console.log(prop);
                            valid = false;
                        }
                    } else {
                        const reg = new RegExp(test);
                        if (!reg.test(match)) {
                            console.log(prop);
                            valid = false;
                        }
                    }
                }
            });
        return valid;
    }

    static toViewModel(model) {
        const viewModel = {};
        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });
        return viewModel;
    }
}

module.exports = Static;
