import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoToTop from './components/GoToTop';

import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/';
import Search from './pages/Search/';

import Recipe from './pages/Recipe/';
import Recipes from './pages/Recipes/';

import recipeData from './data/data.json';

import 'animate.css';
import './assets/App.css';

import { RecipeData } from './interfaces/interface';

function App() {
  const [categories, setCategories] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [Current_Data, setCurrentData] = useState<RecipeData[]>([]);

  // Merge all recipes into on array with no duplicates
  const uniqueNames: string[] = [];
  const All_Recipes_Data: RecipeData[] = recipeData.Recipe_Data.Lunch.concat(
    recipeData.Recipe_Data.Sides,
    recipeData.Recipe_Data.Dinner,
    recipeData.Recipe_Data.Dessert
  ).filter((item) => {
    const isDuplicate = uniqueNames.includes(item.recipe_name);

    if (!isDuplicate) {
      uniqueNames.push(item.recipe_name);
      return true;
    }

    return false;
  });

  const Quick_Recipes_Data: RecipeData[] = recipeData.Recipe_Data.Lunch.concat(
    recipeData.Recipe_Data.Sides,
    recipeData.Recipe_Data.Dinner,
    recipeData.Recipe_Data.Dessert
  ).filter((item) => {
    return item.time_num <= 30;
  });

  const findFavorites: RecipeData[] = All_Recipes_Data.filter((item) =>
    favorites.includes(item.id)
  );

  const Recipe_Data = [
    {
      id: 0,
      name: 'Side Recipes',
      path: '/side-recipes',
      recipe_data: recipeData.Recipe_Data.Sides,
    },
    {
      id: 1,
      name: 'Lunch Recipes',
      path: '/lunch-recipes/',
      recipe_data: recipeData.Recipe_Data.Lunch,
    },
    {
      id: 2,
      name: 'Dinner Recipes',
      path: '/dinner-recipes/',
      recipe_data: recipeData.Recipe_Data.Dinner,
    },
    {
      id: 3,
      name: 'Dessert Recipes',
      path: '/dessert-recipes/',
      recipe_data: recipeData.Recipe_Data.Dessert,
    },
    {
      id: 4,
      name: 'All Recipes',
      path: '/all-recipes/',
      recipe_data: All_Recipes_Data,
    },
    {
      id: 5,
      name: 'Quick Recipes',
      path: '/quick-recipes/',
      recipe_data: Quick_Recipes_Data,
    },
    {
      id: 6,
      name: 'Favorites',
      path: '/favorites/',
      recipe_data: findFavorites,
    },
    {
      id: 7,
      name: 'Featured',
      path: '/featured/',
      recipe_data: recipeData.Featured,
    },
  ];

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

  const updateCurrentData = (data: RecipeData[]) => {
    setCurrentData(() => data);
  };

  const sortArray = (type: any, data: RecipeData[]) => {
    const sorted = data.filter((item) => {
      if (type === 'choose category') return item;
      if (item.categories.includes(type)) return true;

      return false;
    });
    setCurrentData(() => sorted);
  };

  function updateCategories(testData: RecipeData[]) {
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

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='wrapper'>
          <Routes>
            <Route
              path='/recipe-website/'
              element={
                <Home
                  quickRecipes={Quick_Recipes_Data}
                  featured={recipeData.Featured}
                />
              }
            />

            {Recipe_Data.map((item) => {
              return (
                <Route
                  key={item.id}
                  path={item.path}
                  element={
                    <Recipes
                      name={item.name}
                      addToFavorites={addToFavorites}
                      removeFromFavorites={removeFromFavorite}
                      favorites={favorites}
                      categories={categories}
                      updateCategories={updateCategories}
                      updateCurrentData={updateCurrentData}
                      sortArray={sortArray}
                      currentData={Current_Data}
                      recipes={item.recipe_data}
                    />
                  }
                />
              );
            })}

            {/* TODO fix key attribute */}
            {All_Recipes_Data.map((item) => {
              return (
                <Route
                  key={item.id}
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
              );
            })}

            <Route path='/search' element={<Search />} />
          </Routes>
        </div>
        <GoToTop />
      </BrowserRouter>
    </>
  );
}

export default App;
