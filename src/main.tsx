import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.tsx'
import store from "./store";
import { AuthProvider } from './module/auth/context/AuthContext';

const rootElement = document.getElementById('root');

createRoot(rootElement!).render(
  <React.StrictMode>
    <AuthProvider>  {/* Wrap your App with AuthProvider */}
      <Provider store={store}>
          <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);