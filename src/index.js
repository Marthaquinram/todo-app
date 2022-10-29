import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LoginContext } from './context/auth/context';
// import Header from './components/header/header';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginContext>
      <App />
    </LoginContext>
  </React.StrictMode>
);
