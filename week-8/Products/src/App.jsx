import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Page1 from './components/Page1';
import { ProductProvider } from './components/ProductContext';
import AddProduct from './components/AddProduct';
import HomePage from './components/HomePage';

const App = () => (
  <ProductProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Page1 />} /> 
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </Router>
  </ProductProvider>
);

export default App;
