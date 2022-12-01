import { useState, useEffect } from 'react';
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
  const [type, setType] = useState('choose category');
  const [categories, setCategories] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  // Merge all recipes into on array with no duplicates
  const uniqueNames: string[] = [];
  // const All_Recipes_Data: RecipeData[] = recipeData.Lunch.concat(
  //   recipeData.Sides,
  //   recipeData.Dinner,
  //   recipeData.Dessert
  // ).filter((item) => {
  //   const isDuplicate = uniqueNames.includes(item.recipe_name);

  //   if (!isDuplicate) {
  //     uniqueNames.push(item.recipe_name);
  //     return true;
  //   }

  //   return false;
  // });

  const [All_Recipes_Data, setAllRecipesData] = useState((): RecipeData[] => {
    return recipeData.Lunch.concat(
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
  });

  // const Side_Data: RecipeData[] = recipeData.Sides;
  const Lunch_Data: RecipeData[] = recipeData.Lunch;
  const Dinner_Data: RecipeData[] = recipeData.Dinner;
  const Dessert_Data: RecipeData[] = recipeData.Dessert;

  const [Side_Data, setSideData] = useState<RecipeData[]>(recipeData.Sides);

  // const test: string[] = [];
  const Quick_Recipes_Data: RecipeData[] = Lunch_Data.concat(
    Side_Data,
    Dinner_Data,
    Dessert_Data
  ).filter((item) => {
    return item.time_num <= 30;
  });

  const addToFavorites = (id: number) => {
    if (!favorites.includes(id)) setFavorites(favorites.concat(id));
    alert('added to favorites');
  };

  const removeFromFavorite = (id: number) => {
    let index = favorites.indexOf(id);
    let temp = [...favorites.slice(0, index), ...favorites.slice(index + 1)];
    setFavorites(temp);
    alert('removed from favorites');
  };

  const findFavorites = All_Recipes_Data.filter((item) =>
    favorites.includes(item.id)
  );

  const updateType = (type: any) => {
    setType(type);
  };

  function testFunction(testData: RecipeData[]) {
    const test: string[] = [];
    testData.map((item) => {
      return item.categories.filter((item2) => {
        const isDuplicate = test.includes(item2);

        if (!isDuplicate) {
          test.push(item2);
          return true;
        }

        return false;
      });
    });
    setCategories(test);
  }

  useEffect(() => {
    console.log('ran');
    const sortArray = (type: any) => {
      const sorted = recipeData.Lunch.concat(
        recipeData.Sides,
        recipeData.Dinner,
        recipeData.Dessert
      ).filter((item) => {
        if (type === 'choose category') return item;
        if (item.categories.includes(type)) return true;

        return false;
      });
      setAllRecipesData(() => sorted);
    };

    sortArray(type);
  }, [type]);

  // useEffect(() => {
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='wrapper'>
          <Routes>
            <Route path='/recipe-website/' element={<Home />} />

            <Route
              path='/all-recipes'
              element={
                <Recipes
                  addToFavorite={addToFavorites}
                  removeFromFavorite={removeFromFavorite}
                  bookmarked={favorites}
                  setType={updateType}
                  categories={categories}
                  testFunction={testFunction}
                  recipes={All_Recipes_Data}
                />
              }
            />

            <Route
              path='/lunch-recipes'
              element={
                <Lunch
                  addToFavorite={addToFavorites}
                  removeFromFavorite={removeFromFavorite}
                  bookmarked={favorites}
                  setType={updateType}
                  categories={categories}
                  testFunction={testFunction}
                  lunchRecipes={Lunch_Data}
                />
              }
            />
            <Route
              path='/dinner-recipes'
              element={
                <Dinner
                  addToFavorite={addToFavorites}
                  removeFromFavorite={removeFromFavorite}
                  bookmarked={favorites}
                  setType={updateType}
                  categories={categories}
                  dinnerRecipes={Dinner_Data}
                />
              }
            />

            <Route
              path='/side-recipes'
              element={
                <Sides
                  addToFavorite={addToFavorites}
                  removeFromFavorite={removeFromFavorite}
                  bookmarked={favorites}
                  setType={updateType}
                  categories={categories}
                  testFunction={testFunction}
                  sideRecipes={Side_Data}
                />
              }
            />

            <Route
              path='/dessert-recipes'
              element={
                <Dessert
                  addToFavorite={addToFavorites}
                  removeFromFavorite={removeFromFavorite}
                  bookmarked={favorites}
                  setType={updateType}
                  categories={categories}
                  dessertRecipes={Dessert_Data}
                />
              }
            />

            {/* TODO fix key attribute */}
            {All_Recipes_Data.map((item) => {
              return (
                <>
                  <Route
                    path={item.extension}
                    element={
                      <Recipe
                        addToFavorite={addToFavorites}
                        removeFromFavorite={removeFromFavorite}
                        bookmarked={favorites}
                        recipe={item}
                      />
                    }
                  />
                </>
              );
            })}

            <Route
              path='/quick-recipes'
              element={
                <Quick
                  addToFavorite={addToFavorites}
                  removeFromFavorite={removeFromFavorite}
                  bookmarked={favorites}
                  setType={updateType}
                  categories={categories}
                  quickRecipes={Quick_Recipes_Data}
                />
              }
            />
            <Route path='/most-recent-recipes' element={<MostRecent />} />
            <Route
              path='/favorites'
              element={
                <Favorites
                  addToFavorite={addToFavorites}
                  removeFromFavorite={removeFromFavorite}
                  bookmarked={favorites}
                  setType={updateType}
                  categories={categories}
                  favorites={findFavorites}
                />
              }
            />
          </Routes>
        </div>
        <GoToTop />
      </BrowserRouter>
    </>
  );
}

export default App;
