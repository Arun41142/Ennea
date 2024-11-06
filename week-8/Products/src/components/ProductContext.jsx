import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  products: [],
};


function productReducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    default:
      return state;
  }
}

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        dispatch({ type: 'SET_PRODUCTS', payload: response.data.products });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = (newProduct) => {
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
  };

  return (
    <ProductContext.Provider value={{ products: state.products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use products
export const useProducts = () => useContext(ProductContext);
