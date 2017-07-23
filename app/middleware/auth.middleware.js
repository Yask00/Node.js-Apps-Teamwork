module.exports = {
    isInRole(req, role) {
        if (req.user && req.user.role === role) {
            return true;
        }
        return false;
    },
};