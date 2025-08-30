const jwt = require('jsonwebtoken')
const userModels = require('../models/user.models');
const ApiError = require('../utils/ApiError');
const auth = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];

        }
        else if (req.cookies.token) {
            token = req.cookies.token
        }
        if (!token) {
            return next(ApiError(401, "Not authorized to access this route"));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModels.findById(decoded.userId);
        if (!user) {
            return next(ApiError(401, "Not authorized, user not found"));
        }
        if (!user.isActive) {
            return next(ApiError(401,"Not authorized, account is deactivated"))
        }
        req.user = user;
        next()
    } catch (error) {
        return next(ApiError(401,"Not authorized, token failed"))
    }
}

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                ApiError(403,`User role ${req.user.role} is not authorized to access this route`)
            )
        }
        next();
    }
}
module.exports={auth,authorize}