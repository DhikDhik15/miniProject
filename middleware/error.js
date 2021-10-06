const errorHandler = require('../utility/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.mesaage = err.message || 'Internal server error';

    res.status(err.statusCode).json({
        success: false,
        err: err
    });
}