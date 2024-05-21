import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Chatbot from './components/Chatbot/Chatbot';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Chatbot /> {/* Render the Chatbot component */}
  </React.StrictMode>,
)
