import '../init'
import ReactDOM from 'react-dom/client';
import './index.css'
import React from 'react';
import App from './App';
import { AuthProvider } from './contexts/auth/auth-context';


const rootElement = document.getElementById('root')!;

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/serviceworker.js')
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     }).catch((error) => {
//       console.log('Service Worker registration failed:', error);
//     });
// }


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