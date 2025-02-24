
import ReactDOM from 'react-dom/client';
import './index.css'
import React from 'react';
import App from './App';


const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}