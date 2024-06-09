import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Chatbot from './components/Chatbot/Chatbot';
import './index.css';
import Preloader from './components/Preloader/Preloader.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Preloader />
    <Chatbot />{ /*Render the Chatbot component*/ }
    <App />
  </React.StrictMode>,
 document.getElementById('root')
);

document.body.style.userSelect = 'none';
document.body.style.webkitUserSelect = 'none';
document.body.style.mozUserSelect = 'none';
document.body.style.msUserSelect = 'none';
