import express from 'express';
import { postForm, getForms, getForm, deleteForm } from '../controllers';
import { handleValidationError } from '../middleware';
import { checkCreateForm, checkIdParam, checkGetAllForm } from '../validator';

const router = express.Router();

router
  .route('/')
  .get(checkGetAllForm(), handleValidationError, getForms)
  .post(checkCreateForm(), handleValidationError, postForm);

router
  .route('/:id')
  .get(checkIdParam(), handleValidationError, getForm)
  .delete(checkIdParam(), handleValidationError, deleteForm);

export default router;
