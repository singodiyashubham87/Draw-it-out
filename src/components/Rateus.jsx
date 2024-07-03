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
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-black-700 text-white p-8 rounded-lg shadow-lg max-w-md w-full transform transition duration-300 hover:bg-black-900 hover:scale-105">
        <h1 className="text-4xl mb-6 uppercase tracking-wider bg-gradient-to-r from-white to-yellow-500 bg-clip-text text-transparent">Rate Us</h1>
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-4xl cursor-pointer transition duration-300 transform hover:text-yellow-500 hover:scale-125 ${star <= rating ? 'text-yellow-500' : 'text-gray-500'}`}
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
            className="w-full h-28 p-4 mb-6 border border-gray-600 rounded-lg resize-none text-black"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-gray-600 text-white rounded-lg uppercase text-lg transition duration-300 hover:bg-gray-400 hover:shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RateUs;
