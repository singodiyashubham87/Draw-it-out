import React, { useState } from 'react';

const RateUs = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState(''); // success or error

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating > 0 && feedback.trim()) {
      console.log('Rating:', rating);
      console.log('Feedback:', feedback);

      // Show success message
      showMessageWithTimeout('Thanks For Your Feedback :)', 'success');
      
      // Optionally clear the form inputs after submission
      setRating(0);
      setFeedback('');
    } else {
      // Show error message
      showMessageWithTimeout('Please Fill All Details :(', 'error');
    }
  };

  const showMessageWithTimeout = (text, type) => {
    setMessageText(text);
    setMessageType(type);
    setShowMessage(true);

    // Hide the message after 4 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  return (
    <div className="p-4">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full transform transition duration-300 hover:bg-navy-blue-900 hover:scale-105">
        <h1 className="text-4xl mb-0 uppercase tracking-wider bg-gray bg-clip-padding p-4 text-center text-white rounded-md">Rate Us</h1>
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-4xl cursor-pointer transition duration-300 transform hover:text-yellow-500 hover:scale-125 ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
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
            placeholder="Leave your feedback here :)"
            className="w-full h-28 p-4 mb-6 border border-gray-600 rounded-lg resize-none text-black"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-gray-600 text-white rounded-lg uppercase text-lg transition duration-300 hover:bg-gray-400 hover:shadow-lg"
          >
            Submit
          </button>
        </form>
        {showMessage && (
          <div className={`mt-4 text-center ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {messageText}
          </div>
        )}
      </div>
    </div>
  );
};

export default RateUs;
