import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import { ProductProvider } from './components/ProductContext';

const App = () => (
  <ProductProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/confirm" element={<Page2 />} />
      </Routes>
    </Router>
  </ProductProvider>
);

export default App;
