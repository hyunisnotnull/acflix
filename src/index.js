import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Wrap from './acflix/Wrap';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Wrap />
  // </React.StrictMode>
);


reportWebVitals();
