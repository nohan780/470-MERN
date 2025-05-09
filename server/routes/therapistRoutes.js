import express from 'express';
import { getAllTherapists, getTherapistById, addOrUpdateReview, createTherapist } from '../controllers/therapistController.js';

const router = express.Router();

router.get('/', getAllTherapists);
router.get('/:id', getTherapistById);
router.put('/:id/review', addOrUpdateReview);
router.post('/create', createTherapist); 
export default router;
