import React from 'react';
import './App.css';
import { ToastProvider } from './components/ToastProvider';
import Home from './Home';

function App() {
  return (
    <ToastProvider>
      <Home />
    </ToastProvider>
  );
}

export default App;
