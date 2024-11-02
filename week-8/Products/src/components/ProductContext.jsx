import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then((response) =>{ setProducts(response.data.products)
      console.log(response.data.products)}
    )
      
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
