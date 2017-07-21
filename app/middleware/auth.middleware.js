'use strict';

module.exports = {
    isInRole(role) {
        return (req, res, next) => {
            if (req.user && req.user.role.indexOf(role) !== -1) {
                next();
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Not authorized!',
                });
            }
        };
    },
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(401).json({
                success: false,
                message: 'Not authorized!',
            });
        }
    },
};
