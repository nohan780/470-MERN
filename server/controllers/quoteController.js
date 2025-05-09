import Quote from '../models/Quote.js';

export const createQuote = async (req, res) => {
    try {
        const quotes = req.body;
        if (!Array.isArray(quotes) || quotes.length === 0) {
          return res.status(400).json({ error: 'Request body must be a non-empty array of quotes.' });
        }
    
        const result = await Quote.insertMany(quotes);
        res.status(201).json({ message: `${result.length} quotes inserted`, data: result });
      } catch (error) {
        res.status(500).json({ error: 'Bulk insert failed', details: error.message });
      }
};

export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
};

export const getRandomQuote = async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random);
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random quote' });
  }
};
