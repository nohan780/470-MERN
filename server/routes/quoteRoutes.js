import express from 'express';
import {
  createQuote,
  getAllQuotes,
  getRandomQuote
} from '../controllers/quoteController.js';

const router = express.Router();

router.post('/api/quotes', createQuote);
router.get('/api/quotes', getAllQuotes);
router.get('/api/quotes/random', getRandomQuote);

export default router;
