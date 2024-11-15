import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { BlockNumberProvider } from './BlockContext'; // Import the BlockNumberProvider
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BlockNumberProvider>
    <Router>
    <App />
    </Router>
    </BlockNumberProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
