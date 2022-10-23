import express from 'express';
import { postform, getforms, getform } from '../controllers/formController';

const router = express.Router();

router.route('/').get(getforms).post(postform);
router.route('/:id').get(getform);

export default router;
