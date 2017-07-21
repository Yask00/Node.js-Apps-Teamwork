// for register or auth controller 

module.exports = (string) => {
    return string
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;')
        .replace(/'/g, '&quot;')
        .replace(/'/g, '&#039;');
};
