import React,{useContext} from 'react';
import { RecipeContext } from '../components/RecipeContext';

const Favourite = () => {
  const {favList,setFavList}=useContext(RecipeContext);
  return (
    <div className="favourite-page">
        <div className='recipe'>
        {favList.length > 0 ? (
          favList.map((recipe,index) => (
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
    </div>
  );
};

export default Favourite;
