"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const formSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide your first name.'],
        minLength: [2, 'First name must be longer than 2 characters'],
        trim: true,
        lowercase: true,
    },
    surname: {
        type: String,
        required: [true, 'Please provide your surname.'],
        minLength: [2, 'First name must be longer than 2 characters'],
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide a valid email.'],
        validate: [validator_1.default.isEmail, 'Please provide a valid email address.'],
        unique: [true, 'Email Address already exists.'],
        trim: true,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide your mobile number.'],
        minLength: [11, 'Phone number must be 11 digits'],
        trim: true,
    },
    gender: {
        type: String,
        required: [true, 'Please provide your gender.'],
        enum: ['male', 'female', 'prefer-not-to-say'],
    },
    dob: {
        type: String,
        required: [true, 'Please provide your Date of Birth.'],
        trim: true,
    },
    comments: {
        type: String,
        trim: true,
        lowercase: true,
    },
}, { timestamps: true });
exports.Form = (0, mongoose_1.model)('Form', formSchema);
