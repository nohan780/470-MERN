import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, 
    therapyNotes: { type: String },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'mobile_banking'],
        required: true
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
