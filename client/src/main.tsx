
import ReactDOM from 'react-dom/client';
import './index.css'
import React from 'react';
import App from './App';
import { AuthProvider } from './contexts/auth/auth-context';


const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>

    </React.StrictMode>
  )
}