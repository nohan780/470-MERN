import mongoose from "mongoose";

const therapistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    about: { type: String },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String }
    }],
    averageRating: { type: Number, default: 0 }
});

const Therapist = mongoose.model('Therapist', therapistSchema);
export default Therapist;
