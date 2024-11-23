import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const initialState = {
  products: [],
  searchQuery: '',
};

function productReducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
}

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8080/Api/products');
      return response.data;
    },
  });
  

  useEffect(() => {
    if (data) {
      dispatch({ type: 'SET_PRODUCTS', payload: data });
    }
  }, [data]);

  const addProduct = (newProduct) => {
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  return (
    <ProductContext.Provider value={{ 
      products: state.products, 
      searchQuery: state.searchQuery, 
      addProduct, 
      setSearchQuery,
      isLoading,
      error
    }}>
      {children}
    </ProductContext.Provider>
  );
};


const useProducts = () => useContext(ProductContext);


const queryClient = new QueryClient();

const AppProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ProductProvider>
      {children}
    </ProductProvider>
  </QueryClientProvider>
);


export { AppProvider, ProductProvider, useProducts };
