import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from '../utilities/AppError';

export const handleValidationError: RequestHandler = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return new AppError(error.array()[0].msg, 400);
  }
  next();
};
