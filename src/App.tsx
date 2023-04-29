import { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoToTop from './components/GoToTop';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from './components/firebase';

import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/';
import Search from './pages/Search/';

import Recipe from './pages/Recipe/';
import RecipesPage from './pages/Recipes/';
import Bookmarked from './pages/Favorites';
import Login from './pages/LogIn';
import SignUp from './pages/Sign Up';

import recipeData from './data/data.json';

import 'animate.css';
import './assets/App.css';

import { RecipeData } from './interfaces/interface';

function App() {
  const [categories, setCategories] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [CurrentRecipes, setCurrentRecipes] = useState<RecipeData[]>([]);
  const [RecipeData, setRecipeData] = useState<RecipeData[]>([]);

  const SideRecipes = useMemo(
    () =>
      [...RecipeData].filter((item) => {
        return item.categories.includes('Sides');
      }),
    [RecipeData]
  );
  const LunchRecipes = useMemo(
    () =>
      [...RecipeData].filter((item) => {
        return item.categories.includes('Lunch');
      }),
    [RecipeData]
  );
  const DinnerRecipes = useMemo(
    () =>
      [...RecipeData].filter((item) => {
        return item.categories.includes('Dinner');
      }),
    [RecipeData]
  );
  const DessertRecipes = useMemo(
    () =>
      [...RecipeData].filter((item) => {
        return item.categories.includes('Dessert');
      }),
    [RecipeData]
  );

  const findFavorites: RecipeData[] = useMemo(
    () => [...RecipeData].filter((item) => favorites.includes(item.id)),
    [favorites]
  );

  const addToFavorites = (id: number) => {
    if (!favorites.includes(id)) setFavorites((lastVal) => lastVal.concat(id));
    alert('added to favorites');
  };

  const removeFromFavorite = (id: number) => {
    let index = favorites.indexOf(id);
    let temp = [...favorites.slice(0, index), ...favorites.slice(index + 1)];
    setFavorites(temp);
    alert('removed from favorites');
  };

  const updateCurrentRecipes = (data: RecipeData[]) => {
    setCurrentRecipes(() => data);
  };

  const sortArray = useCallback(
    (category: string, recipeData: RecipeData[]) => {
      const sorted = recipeData.filter((item) => {
        if (category === 'choose category') return item;
        if (item.keywords.includes(category)) return true;

        return false;
      });
      setCurrentRecipes(() => sorted);
    },
    [CurrentRecipes]
  );

  function updateCategories(testData: RecipeData[]) {
    const test: string[] = [];
    testData.map((item) => {
      return item.keywords.filter((item2) => {
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

  // const addPost = async () => {
  //   RecipeData.forEach(async (item) => {
  //     try {
  //       const docRef: any = await setDoc(doc(db, 'Recipes', item.recipe_name), {
  //         ...item,
  //       });
  //     } catch (e) {
  //       console.error('Error add document: ', e);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   addPost();
  // }, []);

  const fetchPosts = async () => {
    const docRef = collection(db, 'Recipes');
    const q = query(docRef, orderBy('recipe_name'));

    const querySnapshot = await getDocs(q);

    const newData: RecipeData[] = querySnapshot.docs.map((doc) => {
      const recipe: RecipeData = {
        id: doc.data().id,
        recipe_name: doc.data().recipe_name,
        keywords: doc.data().keywords,
        extension: doc.data().extension,
        categories: doc.data().categories,
        category_extension: doc.data().category_extension,
        description: doc.data().description,
        date_posted: doc.data().date_posted,
        prep_time: doc.data().prep_time,
        cook_time: doc.data().cook_time,
        total_time: doc.data().total_time,
        image: doc.data().image,
        ingredients: doc.data().ingredients,
        steps: doc.data().steps,
      };
      return recipe;
    });
    setRecipeData(newData);
  };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='wrapper'>
          <Routes>
            <Route
              path='/recipe-website/'
              element={
                <Home featured={recipeData.Featured} allRecipes={RecipeData} />
              }
            />

            <Route
              path='/all-recipes/'
              element={
                <RecipesPage
                  name='All Recipes'
                  addToBookmarks={addToFavorites}
                  removeFromBookmarks={removeFromFavorite}
                  bookmarks={favorites}
                  categories={categories}
                  updateCategories={updateCategories}
                  updateCurrentRecipes={updateCurrentRecipes}
                  sortArray={sortArray}
                  currentRecipes={CurrentRecipes}
                  recipes={RecipeData}
                />
              }
            />

            <Route
              path='/lunch-recipes/'
              element={
                <RecipesPage
                  name='Lunch Recipes'
                  addToBookmarks={addToFavorites}
                  removeFromBookmarks={removeFromFavorite}
                  bookmarks={favorites}
                  categories={categories}
                  updateCategories={updateCategories}
                  updateCurrentRecipes={updateCurrentRecipes}
                  sortArray={sortArray}
                  currentRecipes={CurrentRecipes}
                  recipes={LunchRecipes}
                />
              }
            />

            <Route
              path='/dinner-recipes/'
              element={
                <RecipesPage
                  name='Dinner Recipes'
                  addToBookmarks={addToFavorites}
                  removeFromBookmarks={removeFromFavorite}
                  bookmarks={favorites}
                  categories={categories}
                  updateCategories={updateCategories}
                  updateCurrentRecipes={updateCurrentRecipes}
                  sortArray={sortArray}
                  currentRecipes={CurrentRecipes}
                  recipes={DinnerRecipes}
                />
              }
            />

            <Route
              path='/side-recipes/'
              element={
                <RecipesPage
                  name='Side Recipes'
                  addToBookmarks={addToFavorites}
                  removeFromBookmarks={removeFromFavorite}
                  bookmarks={favorites}
                  categories={categories}
                  updateCategories={updateCategories}
                  updateCurrentRecipes={updateCurrentRecipes}
                  sortArray={sortArray}
                  currentRecipes={CurrentRecipes}
                  recipes={SideRecipes}
                />
              }
            />

            <Route
              path='/dessert-recipes/'
              element={
                <RecipesPage
                  name='Dessert Recipes'
                  addToBookmarks={addToFavorites}
                  removeFromBookmarks={removeFromFavorite}
                  bookmarks={favorites}
                  categories={categories}
                  updateCategories={updateCategories}
                  updateCurrentRecipes={updateCurrentRecipes}
                  sortArray={sortArray}
                  currentRecipes={CurrentRecipes}
                  recipes={DessertRecipes}
                />
              }
            />

            <Route
              path='/bookmarked'
              element={
                <Bookmarked
                  name='Bookmarked'
                  addToBookmarks={addToFavorites}
                  removeFromBookmarks={removeFromFavorite}
                  bookmarks={favorites}
                  categories={categories}
                  updateCategories={updateCategories}
                  updateCurrentRecipes={updateCurrentRecipes}
                  sortArray={sortArray}
                  currentRecipes={CurrentRecipes}
                  recipes={findFavorites}
                />
              }
            />

            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />

            {RecipeData.map((item) => {
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

            <Route path='/search' element={<Search recipe={RecipeData} />} />
          </Routes>
        </div>
        <GoToTop />
      </BrowserRouter>
    </>
  );
}

export default App;
