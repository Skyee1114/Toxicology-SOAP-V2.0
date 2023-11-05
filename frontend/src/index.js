import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";

import './index.css';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.createRoot(
    document.getElementById("app"),
  ).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});
