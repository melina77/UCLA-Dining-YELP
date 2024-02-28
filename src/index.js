import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./header.css";
import "./nav.css"
import "./counter.css"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

