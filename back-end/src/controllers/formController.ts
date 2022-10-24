import { RequestHandler } from 'express';
import { AppError } from '../utilities/';
import { v4 as uuidv4 } from 'uuid';
import { IParams } from '../types/FormTypes.model';
import { FormInstance } from '../models/SquelizeFormModel';

export const postForm: RequestHandler = async (req, res, next) => {
  try {
    const id = uuidv4();
    const { firstName, surname, email, phoneNumber, gender, dob, comments } =
      req.body;

    const newFrom = await FormInstance.create({
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
  } catch (err) {
    next(err);
  }
};

export const getForms: RequestHandler = async (req, res, next) => {
  try {
    const limit = (req.query.limit as number | undefined) || 10;
    const offset = req.query.offset as number | undefined;
    const forms = await FormInstance.findAll({ where: {}, limit, offset });
    res.status(200).json({
      status: 'success',
      results: forms.length,
      data: forms,
    });
  } catch (err) {
    next(err);
  }
};

export const getForm: RequestHandler<IParams> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const form = await FormInstance.findAll({ where: { id } });

    if (!form) {
      return next(new AppError("Form doesn't exisit", 404));
    }

    res.status(200).json({
      status: 'success',
      data: form,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteForm: RequestHandler<IParams> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const form = await FormInstance.findOne({ where: { id } });
    if (!form) {
      return next(new AppError("Form doesn't exisit", 404));
    }

    await form.destroy();

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};
