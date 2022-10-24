"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteForm = exports.getForm = exports.getForms = exports.postForm = void 0;
const utilities_1 = require("../utilities/");
const uuid_1 = require("uuid");
const SquelizeFormModel_1 = require("../models/SquelizeFormModel");
const postForm = async (req, res, next) => {
    try {
        const id = (0, uuid_1.v4)();
        const { firstName, surname, email, phoneNumber, gender, dob, comments } = req.body;
        const newFrom = await SquelizeFormModel_1.FormInstance.create({
            id,
            firstName,
            surname,
            email,
            phoneNumber,
            gender,
            dob,
            comments,
        });
        res.status(201).json({ status: 'success', data: newFrom });
    }
    catch (err) {
        next(err);
    }
};
exports.postForm = postForm;
const getForms = async (req, res, next) => {
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset;
        const forms = await SquelizeFormModel_1.FormInstance.findAll({ where: {}, limit, offset });
        res.status(200).json({
            status: 'success',
            results: forms.length,
            data: forms,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getForms = getForms;
const getForm = async (req, res, next) => {
    try {
        const { id } = req.params;
        const form = await SquelizeFormModel_1.FormInstance.findAll({ where: { id } });
        if (!form) {
            return next(new utilities_1.AppError("Form doesn't exisit", 404));
        }
        res.status(200).json({
            status: 'success',
            data: form,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getForm = getForm;
const deleteForm = async (req, res, next) => {
    try {
        const { id } = req.params;
        const form = await SquelizeFormModel_1.FormInstance.findOne({ where: { id } });
        if (!form) {
            return next(new utilities_1.AppError("Form doesn't exisit", 404));
        }
        await form.destroy();
        res.status(204).json({
            status: 'success',
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteForm = deleteForm;
