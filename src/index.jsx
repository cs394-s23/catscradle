import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Listing from './Listing';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Listing />
  </React.StrictMode>
);
