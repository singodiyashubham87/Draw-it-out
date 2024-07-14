import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Chatbot from './components/Chatbot/Chatbot';
import './index.css';
import Preloader from './components/Preloader/Preloader.jsx';
import CursorTrail from './components/CursorTrailEffect.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Preloader />
    <CursorTrail />
    <Chatbot />{ /*Render the Chatbot component*/ }
  </React.StrictMode>,
)