import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/';

import Recipe from './pages/Recipe/';
import Recipes from './pages/Recipes/';
import Breakfast from './pages/Recipes/Breakfast/';
import Lunch from './pages/Recipes/Lunch/';
import Dinner from './pages/Recipes/Dinner/';
import Dessert from './pages/Recipes/Dessert/';

import Quick from './pages/Quick/';
import MostRecent from './pages/Most-Recent/';
import Favorites from './pages/Favorites/';

import recipeData from './data/data.json';

import 'animate.css';
import './assets/App.css';

function App() {
  const Recipe_Data = recipeData.recipe_data;
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='wrapper'>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/all-recipes' element={<Recipes />} />
            <Route path='/breakfast-recipes' element={<Breakfast />} />
            <Route path='/lunch-recipes' element={<Lunch />} />
            <Route path='/dinner-recipes' element={<Dinner />} />
            <Route path='/dessert-recipes' element={<Dessert />} />

            {Recipe_Data.map((item) => {
              return (
                <>
                  <Route
                    path={item.extension}
                    element={<Recipe test={item} />}
                  />
                  ;
                </>
              );
            })}

            <Route path='/quick-recipes' element={<Quick />} />
            <Route path='/most-recent-recipes' element={<MostRecent />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
