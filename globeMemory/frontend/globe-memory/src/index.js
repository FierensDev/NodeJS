import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DisplayMessageProvider } from './context/displayMessageContext';
import { AuthProvider } from './context/authContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DisplayMessageProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </DisplayMessageProvider>
  </React.StrictMode>
);
