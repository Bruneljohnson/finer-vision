import { AppError } from './AppError';
import { Response } from 'express';
import { IError } from '../types/UtilitiesType.model';

const castDBErrorHandler = (err: IError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const duplicateDBErrorHandler = (err: IError) => {
  const value = err.errmsg!.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  const message = `Duplicate field value: ${
    value![0]
  }, please use another value.`;
  return new AppError(message, 400);
};

const validationDBErrorHandler = (err: IError) => {
  const errors = Object.values(err.errors!).map((error) => error.message);
  const message = `Invalid input value: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err: IError, res: Response) => {
  res.status(err.statusCode!).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: IError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode!).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong.',
    });
  }
};

export const globalErrorHandler = (err: IError, res: Response) => {
  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = castDBErrorHandler(error);
    if (error.code === 11000) error = duplicateDBErrorHandler(error);
    if (error.name === 'ValidationError')
      error = validationDBErrorHandler(error);

    sendErrorProd(error, res);
  }
};
