"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const express_validator_1 = require("express-validator");
const AppError_1 = require("../utilities/AppError");
const handleValidationError = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return new AppError_1.AppError(error.array()[0].msg, 400);
    }
    next();
};
exports.handleValidationError = handleValidationError;
