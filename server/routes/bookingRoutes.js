import express from 'express';
import { createBooking, getBookingsForUser, updatePaymentStatus, deleteBooking} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/bookings', getBookingsForUser);
router.patch('/bookings/:appointmentId', updatePaymentStatus);
router.delete('/bookings/delete/:id', deleteBooking);
export default router;
