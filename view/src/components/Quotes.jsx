import React, { useState } from 'react';
import axios from '../../axios';
import '../styles/styles.css';

const Quotes = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomQuote = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/quotes/random');
      setQuote(res.data);
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      setQuote({ text: 'Something went wrong. Try again later.', author: '', type: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quote-container">
      <h2>Daily Quote</h2>
      <button onClick={fetchRandomQuote} disabled={loading} className="quote-button">
        {loading ? 'Loading...' : 'Get Random Quote'}
      </button>

      {quote && (
        <div className="quote-box">
          <p className="quote-text">"{quote.text}"</p>
          {quote.author && <p className="quote-author">— {quote.author}</p>}
          {quote.type && <span className="quote-type">{quote.type.toUpperCase()}</span>}
        </div>
      )}
    </div>
  );
};

export default Quotes;
