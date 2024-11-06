import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Page1 from './components/Page1';
import HomePage from './components/HomePage';
import { AppProvider } from './components/ProductContext';  

const App = () => (
  <AppProvider> 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Page1 />} /> 
      </Routes>
    </Router>
  </AppProvider>
);

export default App;
