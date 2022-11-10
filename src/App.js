import React from 'react';
import './App.scss';
import Layout from './components/layout';
import { GlobalProvider } from './context/globalContext';

//Components
//wrapping our hold app in Layout.
function App() {
  return (
    <GlobalProvider>
      <Layout />
    </GlobalProvider>

  );
}

export default App;
