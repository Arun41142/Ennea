// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './navList/Home';
import Search from './navList/Search';
import Favourite from './navList/Favourite';
import Recipe from './navList/Recipe';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import { RecipeProvider } from './components/RecipeContext'; 

const App = () => {
  return (
    <RecipeProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path="/recipe" element={<Recipe />} /> */}
          <Route path="/favourite" element={<Favourite />} />
        </Routes>
      </Router>
    </RecipeProvider>
  );
};

export default App;
