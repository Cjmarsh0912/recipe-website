// import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoToTop from './components/GoToTop';

import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/';

import Recipe from './pages/Recipe/';
import Recipes from './pages/Recipes/';
import Sides from './pages/Recipes/Sides/';
import Lunch from './pages/Recipes/Lunch/';
import Dinner from './pages/Recipes/Dinner/';
import Dessert from './pages/Recipes/Dessert/';

import Quick from './pages/Quick/';
import MostRecent from './pages/Most-Recent/';
import Favorites from './pages/Favorites/';

import recipeData from './data/data.json';

import 'animate.css';
import './assets/App.css';

import { RecipeData } from './interfaces/interface';

function App() {
  const uniqueNames: string[] = [];
  const All_Recipes_Data: RecipeData[] = recipeData.Lunch.concat(
    recipeData.Sides,
    recipeData.Dinner,
    recipeData.Dessert
  ).filter((item) => {
    const isDuplicate = uniqueNames.includes(item.recipe_name);

    if (!isDuplicate) {
      uniqueNames.push(item.recipe_name);
      return true;
    }

    return false;
  });

  const Side_Data: RecipeData[] = recipeData.Sides;
  const Lunch_Data: RecipeData[] = recipeData.Lunch;
  const Dinner_Data: RecipeData[] = recipeData.Dinner;
  const Dessert_Data: RecipeData[] = recipeData.Dessert;

  // Merge all recipes into on array with no duplicates

  // const test: string[] = [];
  const Quick_Recipes_Data: RecipeData[] = Lunch_Data.concat(
    Side_Data,
    Dinner_Data,
    Dessert_Data
  ).filter((item) => {
    return item.time_num <= 30;
  });

  // const [bookmarked, setBookmarked] = useState([])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='wrapper'>
          <Routes>
            <Route path='/recipe-website/' element={<Home />} />

            <Route
              path='/all-recipes'
              element={<Recipes recipes={All_Recipes_Data} />}
            />

            <Route
              path='/lunch-recipes'
              element={<Lunch lunchRecipes={Lunch_Data} />}
            />
            <Route
              path='/dinner-recipes'
              element={<Dinner dinnerRecipes={Dinner_Data} />}
            />

            <Route
              path='/side-recipes'
              element={<Sides sideRecipes={Side_Data} />}
            />

            <Route
              path='/dessert-recipes'
              element={<Dessert dessertRecipes={Dessert_Data} />}
            />

            {/* TODO fix key attribute */}
            {All_Recipes_Data.map((item) => {
              return (
                <>
                  <Route
                    path={item.extension}
                    element={<Recipe recipe={item} />}
                  />
                </>
              );
            })}

            <Route
              path='/quick-recipes'
              element={<Quick quickRecipes={Quick_Recipes_Data} />}
            />
            <Route path='/most-recent-recipes' element={<MostRecent />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </div>
        <GoToTop />
      </BrowserRouter>
    </>
  );
}

export default App;
