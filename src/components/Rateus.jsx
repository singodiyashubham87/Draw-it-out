import React, { useState } from 'react';
import './Rateus.css';

const RateUs = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
  };

  return (
    <div className="rate-us-container">
      <h1>Rate Us</h1>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'selected' : ''}`}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Leave your feedback here"
          className="feedback-textarea"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RateUs;
