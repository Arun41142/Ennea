import React, { useState,useContext } from 'react';
import { RecipeContext } from './RecipeContext';

const RecipeList = () => {
  const { recipes } = useContext(RecipeContext);
  const {favList,setFavList}=useContext(RecipeContext);

  const addItem=(index)=>{
    alert('Item added to Favourite');
    console.log(recipes[index]);
    const newItem=recipes[index];
    setFavList([...favList,newItem]);
  }
  console.log(favList);


  return (
    <div className='recipe'>
      {recipes.length > 0 ? (
        recipes.map((recipe,index) => (
          <div key={recipe.id} className='recipe-content'>
            <img src={recipe.image} alt={recipe.title} className='recipe-image'/>
            <h2 className='recipe-title'>{recipe.title}</h2>
            <button onClick={()=>addItem(index)} className='favi'>Add Fav</button>
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
