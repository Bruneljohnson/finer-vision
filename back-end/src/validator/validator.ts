import { body, param, query } from 'express-validator';

export const checkCreateForm = () => {
  return [
    body('id').optional().isUUID(4).withMessage('The value should be UUID v4'),
    body('firstName').notEmpty().withMessage('Please provide your first name.'),
    body('surname').notEmpty().withMessage('Please provide your surname.'),
    body('email').notEmpty().withMessage('Please provide your email address.'),
    body('phoneNumber')
      .notEmpty()
      .withMessage('Please provide your phone number.'),
    body('gender').notEmpty().withMessage('Please provide your gender.'),
    body('dob').notEmpty().withMessage('Please provide your date of birth.'),
    body('comments').notEmpty().withMessage('Please provide your comments.'),
  ];
};

export const checkGetAllForm = () => {
  return [
    query('limit')
      .optional()
      .isInt({ min: 1, max: 10 })
      .withMessage('The limit value should be number and between 1-10'),
    query('offset')
      .optional()
      .isNumeric()
      .withMessage('The value should be number'),
  ];
};

export const checkIdParam = () => {
  return [
    param('id')
      .notEmpty()
      .withMessage('The value should be not empty')
      .isUUID(4)
      .withMessage('The value should be uuid v4'),
  ];
};
