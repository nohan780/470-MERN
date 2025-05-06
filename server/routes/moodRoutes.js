// server/routes/moodRoutes.js

import express from 'express';
import { createMood, getUserMoods, getMoodStats } from '../controllers/moodController.js';

const router = express.Router();

// Create a new mood entry
router.post('/create', createMood);

// Get all mood entries for the logged-in user
router.get('/all', getUserMoods);

// Get mood statistics (for suggestions/trends)
router.get('/stats', getMoodStats);

export default router;
