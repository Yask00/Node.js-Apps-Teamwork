module.exports = {
    phone: { $type: 'string' },
    name: { $regex: /@mongodb\.com$/ },
    location: { $in: ['Unknown', 'Incomplete'] },
    startDate: { $in: ['Unknown', 'Incomplete'] },
};