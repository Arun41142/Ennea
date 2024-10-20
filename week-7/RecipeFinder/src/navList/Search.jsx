import React, { useContext, useState } from 'react';
import { RecipeContext } from '../components/RecipeContext';
import RecipeList from '../components/RecipeList';

const Search = () => {
  const { recipes } = useContext(RecipeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="search-page">
      <h2>Search Results</h2>
      {(recipes.length > 0) ? <RecipeList /> : <p>No recipes found. Please search again.</p>}
    </div>
  );
};

export default Search;
