"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const AppError_1 = require("./AppError");
const castDBErrorHandler = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError_1.AppError(message, 400);
};
const duplicateDBErrorHandler = (err) => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
    const message = `Duplicate field value: ${value[0]}, please use another value.`;
    return new AppError_1.AppError(message, 400);
};
const validationDBErrorHandler = (err) => {
    const errors = Object.values(err.errors).map((error) => error.message);
    const message = `Invalid input value: ${errors.join('. ')}`;
    return new AppError_1.AppError(message, 400);
};
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong.',
        });
    }
};
const globalErrorHandler = (err, res) => {
    var _a, _b;
    err.statusCode = (_a = err.statusCode) !== null && _a !== void 0 ? _a : 500;
    err.status = (_b = err.status) !== null && _b !== void 0 ? _b : 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = Object.assign({}, err);
        error.message = err.message;
        if (error.name === 'CastError')
            error = castDBErrorHandler(error);
        if (error.code === 11000)
            error = duplicateDBErrorHandler(error);
        if (error.name === 'ValidationError')
            error = validationDBErrorHandler(error);
        sendErrorProd(error, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
