import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import { RecipeContext } from './RecipeContext';

const Navbar = () => {
  const [input, setInput] = useState('');
  const { setRecipes } = useContext(RecipeContext); 
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleHomeClick = () => {
    setRecipes([]);  
  };
  const fetchRecipes = async (input) => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
        params: {
          ingredients: input,
          apiKey: '37efd7438a4a4e8aa36a2b7f14fbb49a',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  };

  const handleSearch = async () => {
    const recipes = await fetchRecipes(input); 
    setRecipes(recipes); 
    navigate('/search');
  };

  return (
    <div className="container">
      <h1 className="brand">RECIPE FINDER</h1>
      <div className="links">
        <Link to="/">HOME</Link>
        <Link to="/search" >SEARCH</Link>
        {/* <Link to="/recipe" >RECIPES</Link> */}
        <Link to="/favourite" >FAVOURITE</Link>
      </div>
      <input type="text" onChange={handleChange} placeholder="Search a Recipe" />
      <button className="search" onClick={handleSearch}>SEARCH</button>
    </div>
  );
};

export default Navbar;
