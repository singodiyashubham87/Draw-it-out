import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Chatbot from './components/Chatbot/Chatbot'; // Import the Chatbot component
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Chatbot /> {/* Render the Chatbot component */}
  </React.StrictMode>,
);
