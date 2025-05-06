// server/controllers/moodController.js

import Mood from "../models/mood.js";

// Create a new mood entry
export const createMood = async (req, res) => {
    const userId = req.session.userId;
    const { emotion, thoughts, tags } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    try {
        const newMood = new Mood({
            userId,
            emotion,
            thoughts,
            tags
        });

        await newMood.save();
        res.status(201).json({ message: "Mood entry created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all moods for the logged-in user
export const getUserMoods = async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    try {
        const moods = await Mood.find({ userId }).sort({ date: -1 });
        res.status(200).json(moods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get mood stats (basic mood frequency)
export const getMoodStats = async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    try {
        const stats = await Mood.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: "$emotion", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
