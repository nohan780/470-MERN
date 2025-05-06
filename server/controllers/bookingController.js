import Booking from '../models/booking.js';
import Therapist from '../models/therapist.js';

export const createBooking = async (req, res) => {
    try {
        const { userId, therapistId, date, time, paymentMethod } = req.body;

        if (!userId || !therapistId || !date || !time || !paymentMethod) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const bookingDate = new Date(date);
        bookingDate.setHours(0, 0, 0, 0); // Normalize date to midnight for comparison

        // Count existing bookings for therapist on the same day
        const bookingCount = await Booking.countDocuments({
            therapist: therapistId,
            date: bookingDate
        });

        if (bookingCount >= 3) {
            return res.status(400).json({ message: "Therapist is fully booked for the selected date" });
        }

        // Create the booking
        const newBooking = new Booking({
            user: userId,
            therapist: therapistId,
            date: bookingDate,
            time,
            paymentMethod,
            paymentStatus: "pending"
        });

        await newBooking.save();

        res.status(201).json({ message: "Booking successful", booking: newBooking });

    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
