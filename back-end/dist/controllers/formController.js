"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getforms = exports.getform = exports.postform = void 0;
const APIFeatures_1 = require("../utilities/APIFeatures");
const AppError_1 = require("../utilities/AppError");
const formModel_1 = require("../models/formModel");
const postform = async (req, res, next) => {
    try {
        const { firstName, surname, email, phoneNumber, gender, dob, comments } = req.body;
        const newFrom = await formModel_1.Form.create({
            firstName,
            surname,
            email,
            phoneNumber,
            gender,
            dob,
            comments,
        });
        newFrom.__v = undefined;
        res.status(201).json({ status: 'success', data: newFrom });
    }
    catch (err) {
        next(err);
    }
};
exports.postform = postform;
const getform = async (req, res, next) => {
    try {
        const form = await formModel_1.Form.findById(req.params.id).populate({
            path: 'orders',
            select: '-__v ',
        });
        if (!form) {
            return next(new AppError_1.AppError("Form doesn't exisit", 404));
        }
        form.__v = undefined;
        res.status(200).json({
            status: 'success',
            data: form,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getform = getform;
const getforms = async (req, res, next) => {
    try {
        const reqQuery = req.query;
        const ApiFeatures = new APIFeatures_1.APIFeatures(formModel_1.Form.find(), reqQuery)
            .filter()
            .sort()
            .fields()
            .paginate();
        const tickets = await ApiFeatures.query;
        res.status(200).json({
            status: 'success',
            results: tickets.length,
            data: tickets,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getforms = getforms;
