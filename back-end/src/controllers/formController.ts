import { RequestHandler } from 'express';
import { APIFeatures } from '../utilities/APIFeatures';
import { AppError } from '../utilities/AppError';
import { Form } from '../models/formModel';
import { IParams } from '../types/FormTypes.model';

export const postform: RequestHandler = async (req, res, next) => {
  try {
    const { firstName, surname, email, phoneNumber, gender, dob, comments } =
      req.body;
    const newFrom = await Form.create({
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
  } catch (err) {
    next(err);
  }
};

export const getform: RequestHandler<IParams> = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id).populate({
      path: 'orders',
      select: '-__v ',
    });

    if (!form) {
      return next(new AppError("Form doesn't exisit", 404));
    }

    form.__v = undefined;

    res.status(200).json({
      status: 'success',
      data: form,
    });
  } catch (err) {
    next(err);
  }
};

export const getforms: RequestHandler = async (req, res, next) => {
  try {
    const reqQuery: any = req.query;
    const ApiFeatures = new APIFeatures(Form.find(), reqQuery)
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
  } catch (err) {
    next(err);
  }
};
