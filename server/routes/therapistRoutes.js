import express from 'express';
import { getAllTherapists, getTherapistById, addOrUpdateReview } from '../controllers/therapistController.js';

const router = express.Router();

router.get('/', getAllTherapists);
router.get('/:id', getTherapistById);
router.post('/:id/review', addOrUpdateReview);

export default router;
