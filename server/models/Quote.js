import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  type: { type: String, enum: ['affirmation', 'motivational'], default: 'motivational' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Quote', QuoteSchema);
