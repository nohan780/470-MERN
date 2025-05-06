import Therapist from '../models/therapist.js';

export const getAllTherapists = async (req, res) => {
    try {
        const therapists = await Therapist.find();
        res.status(200).json(therapists);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch therapists' });
    }
};

export const getTherapistById = async (req, res) => {
    try {
        const therapist = await Therapist.findById(req.params.id);
        if (!therapist) return res.status(404).json({ message: 'Therapist not found' });
        res.status(200).json(therapist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch therapist' });
    }
};

export const addOrUpdateReview = async (req, res) => {
    try {
        const { rating, comment, userId } = req.body;
        const therapist = await Therapist.findById(req.params.id);
        if (!therapist) return res.status(404).json({ message: 'Therapist not found' });

        // Check if user already reviewed
        const existingReview = therapist.reviews.find(r => r.user.toString() === userId);
        if (existingReview) {
            existingReview.rating = rating;
            existingReview.comment = comment;
        } else {
            therapist.reviews.push({ user: userId, rating, comment });
        }

        const total = therapist.reviews.reduce((acc, r) => acc + r.rating, 0);
        therapist.averageRating = (total / therapist.reviews.length).toFixed(2);

        await therapist.save();
        res.status(200).json({ message: 'Review saved', therapist });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit review' });
    }
};

export const createTherapist = async (req, res) => {
    try {
        const { name, about } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: "Name is required." });
        }

        const newTherapist = new Therapist({
            name,
            about: about || "No description provided.",  // Default if about is empty
        });

        await newTherapist.save();
        
        res.status(201).json({ message: "Therapist created successfully", therapist: newTherapist });
    } catch (error) {
        console.error("Error creating therapist:", error);
        res.status(500).json({ message: 'Failed to create therapist' });
    }
};