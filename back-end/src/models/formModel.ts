import { Schema, model } from 'mongoose';
import validator from 'validator';
import { IFormSchema } from '../types/FormTypes.model';

const formSchema = new Schema<IFormSchema>(
  {
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
      validate: [validator.isEmail, 'Please provide a valid email address.'],
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
  },
  { timestamps: true }
);

export const Form = model<IFormSchema>('Form', formSchema);
