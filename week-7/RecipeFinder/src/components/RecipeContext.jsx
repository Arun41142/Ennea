import React, { createContext, useState } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favList, setFavList] = useState([]);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes,favList,setFavList }}>
      {children}
    </RecipeContext.Provider>
  );
};
