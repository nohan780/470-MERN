import express from 'express';
import { createBooking, getBookingsForUser, updatePaymentStatus} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/bookings', getBookingsForUser);
router.patch('/bookings/:appointmentId', updatePaymentStatus);
export default router;
