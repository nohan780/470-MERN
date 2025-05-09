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


export const getBookingsForUser = async (req, res) => {
    try {
        const userId = req.session.userId;  

        
        const bookings = await Booking.find({ user: userId })
            .populate('therapist', 'name about')  
            .populate('user', 'username email'); 

        if (bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }

        
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch bookings' });
    }
};



export const updatePaymentStatus = async (req, res) => {
    try {
      const { appointmentId } = req.params; // Get the booking ID from URL params
      const { paymentStatus } = req.body; // Get the new payment status from request body
  
      // Find the booking by its ID and update the paymentStatus
      const booking = await Booking.findByIdAndUpdate(
        appointmentId,
        { paymentStatus },
        { new: true } // Return the updated booking document
      );
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json(booking); // Send back the updated booking
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update payment status' });
    }
  };

  export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        const userId = req.session.userId;
        if (!booking.user.equals(userId)) {
            return res.status(403).json({ message: "You are not authorized to delete this booking" });
        }
        await booking.remove();
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Delete booking error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
  
  