const ApiError = (statusCode, message, errors = [], stack = "") => {
    var error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    error.data = null;
    error.success = false;
    error.errors = errors
    // if (stack) {
    //     error.stack = stack;
    // }
    // else {
    //     Error.captureStackTrace(error,ApiError)
    // }
    return error
}
module.exports = ApiError;