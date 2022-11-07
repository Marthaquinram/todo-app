// import { useState } from 'react';
import React from 'react';
import './App.scss';
import Layout from './components/layout';
import { GlobalProvider } from './context/globalContext';

//Components
function App() {
  return (
    <GlobalProvider>
      <Layout />
    </GlobalProvider>

  );
}

export default App;
