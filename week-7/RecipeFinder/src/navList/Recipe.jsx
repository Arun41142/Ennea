import React, { useContext } from 'react';
import { RecipeContext } from '../components/RecipeContext';

const Recipe = () => {
  const { recipes } = useContext(RecipeContext);

  return (
    <div className="recipes-page">
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recipe;
