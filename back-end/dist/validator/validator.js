"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIdParam = exports.checkGetAllForm = exports.checkCreateForm = void 0;
const express_validator_1 = require("express-validator");
const checkCreateForm = () => {
    return [
        (0, express_validator_1.body)('id').optional().isUUID(4).withMessage('The value should be UUID v4'),
        (0, express_validator_1.body)('firstName').notEmpty().withMessage('Please provide your first name.'),
        (0, express_validator_1.body)('surname').notEmpty().withMessage('Please provide your surname.'),
        (0, express_validator_1.body)('email').notEmpty().withMessage('Please provide your email address.'),
        (0, express_validator_1.body)('phoneNumber')
            .notEmpty()
            .withMessage('Please provide your phone number.'),
        (0, express_validator_1.body)('gender').notEmpty().withMessage('Please provide your gender.'),
        (0, express_validator_1.body)('dob').notEmpty().withMessage('Please provide your date of birth.'),
        (0, express_validator_1.body)('comments').notEmpty().withMessage('Please provide your comments.'),
    ];
};
exports.checkCreateForm = checkCreateForm;
const checkGetAllForm = () => {
    return [
        (0, express_validator_1.query)('limit')
            .optional()
            .isInt({ min: 1, max: 10 })
            .withMessage('The limit value should be number and between 1-10'),
        (0, express_validator_1.query)('offset')
            .optional()
            .isNumeric()
            .withMessage('The value should be number'),
    ];
};
exports.checkGetAllForm = checkGetAllForm;
const checkIdParam = () => {
    return [
        (0, express_validator_1.param)('id')
            .notEmpty()
            .withMessage('The value should be not empty')
            .isUUID(4)
            .withMessage('The value should be uuid v4'),
    ];
};
exports.checkIdParam = checkIdParam;
