import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Assicurati che questo import sia presente
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
