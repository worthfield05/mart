const ApiError = require('../utils/ApiError');
const errorHandler = (err, req, res, next) => {
    let error = err;
    console.error(err)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `${field} already exists`;
        error = ApiError(400, message);
    }
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message)
        error = ApiError(400, messages.join(', '));

    }
    if (err.name === 'JsonWebTokenError') {
        const message = "Invalid token";
        error =  ApiError(401, message)
    }
    if (err.name === 'TokenExpiredError') {
        const message = 'Token expired';
        error =  ApiError(401,message)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
        ...(process.env.NODE_ENV === 'development' && {stack:error.stack})
    })
}
module.exports = errorHandler