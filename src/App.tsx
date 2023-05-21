import { useEffect, useMemo, useCallback } from 'react';
import {
  useStateContext,
  useDispatchContext,
  useFunctionContext,
} from './Context/RecipeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoToTop from './components/GoToTop';
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  limit,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
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

import { RecipeData, user, InitialState } from './interfaces/interface';

function App() {
  const { state } = useStateContext();
  const { dispatch } = useDispatchContext();
  const { addToFavorites, updateUserInDatabase } = useFunctionContext();
  const {
    categories,
    favorites,
    currentRecipes,
    recipeData,
    userData,
    isSignedIn,
    isLoading,
  }: InitialState = state;

  function filterRecipesByCategory(category: string, recipes: RecipeData[]) {
    return [...recipes].filter((item) => item.categories.includes(category));
  }

  const SideRecipes = useMemo(
    () => filterRecipesByCategory('Sides', recipeData),
    [recipeData]
  );
  const LunchRecipes = useMemo(
    () => filterRecipesByCategory('Lunch', recipeData),
    [recipeData]
  );
  const DinnerRecipes = useMemo(
    () => filterRecipesByCategory('Dinner', recipeData),
    [recipeData]
  );
  const DessertRecipes = useMemo(
    () => filterRecipesByCategory('Dessert', recipeData),
    [recipeData]
  );

  const findFavorites: RecipeData[] = useMemo(
    () => [...recipeData].filter((item) => favorites.includes(item.id)),
    [favorites]
  );

  // const addToFavorites = (id: number) => {
  //   if (!favorites.includes(id)) {
  //     const newFavorites = [...favorites, id];
  //     if (isSignedIn && userData?.uid !== undefined) {
  //       const newUserData = { ...userData, bookmarks: newFavorites };
  //       dispatch({ type: 'SET_USER_DATA', payload: newUserData });
  //       updateUserInDatabase(newUserData);
  //     }
  //     dispatch({ type: 'SET_FAVORITES', payload: newFavorites });
  //     alert('added to favorites');
  //   }
  // };

  const removeFromFavorite = (id: number) => {
    let newFavorites = favorites.filter((item) => {
      return item !== id;
    });
    dispatch({ type: 'SET_FAVORITES', payload: newFavorites });
    alert('removed from favorites');
  };

  const updateCurrentRecipes = (data: RecipeData[]) => {
    dispatch({ type: 'SET_CURRENT_RECIPES', payload: data });
  };

  const sortArray = useCallback(
    (category: string, recipeData: RecipeData[]) => {
      const sorted = recipeData.filter((item) => {
        if (category === 'choose category') return item;
        if (item.keywords.includes(category)) return true;

        return false;
      });
      dispatch({ type: 'SET_CURRENT_RECIPES', payload: sorted });
    },
    [currentRecipes]
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
    dispatch({ type: 'SET_CATEGORIES', payload: test });
  }

  function updateIsSignedIn() {
    dispatch({ type: 'SET_IS_SIGNED_IN', payload: !isSignedIn });
  }

  const updateFavorites = (newFavorites: number[]) => {
    dispatch({ type: 'SET_FAVORITES', payload: newFavorites });
  };

  const updateUserData = (newUserData: user | null) => {
    if (newUserData === null) dispatch({ type: 'SET_FAVORITES', payload: [] });
    dispatch({ type: 'SET_USER_DATA', payload: newUserData });
  };

  const updateRecipeData = (recipe: RecipeData) => {
    const newRecipeData: RecipeData[] = [...recipeData].map((item) => {
      if (item.id === recipe.id) return recipe;
      return item;
    });
    dispatch({ type: 'SET_RECIPE_DATA', payload: newRecipeData });
  };

  // const addPost = async () => {
  //   const docRef = collection(db, 'Recipes');
  //   const q = query(docRef, orderBy('recipe_name'));
  //   const querySnapshot = await getDocs(q);
  //   const newData: RecipeData[] = querySnapshot.docs.map((doc) => {
  //     const recipe: RecipeData = {
  //       id: doc.data().id,
  //       recipe_name: doc.data().recipe_name,
  //       keywords: doc.data().keywords,
  //       extension: doc.data().extension,
  //       categories: doc.data().categories,
  //       category_extension: doc.data().category_extension,
  //       rating: 0,
  //       times_rated: 0,
  //       comments: [],
  //       description: doc.data().description,
  //       date_posted: doc.data().date_posted,
  //       prep_time: doc.data().prep_time,
  //       cook_time: doc.data().cook_time,
  //       total_time: doc.data().total_time,
  //       image: doc.data().image,
  //       ingredients: doc.data().ingredients,
  //       steps: doc.data().steps,
  //     };
  //     return recipe;
  //   });

  //   newData.forEach(async (item) => {
  //     try {
  //       await setDoc(doc(db, 'Recipes', item.recipe_name), {
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

    console.log(querySnapshot.size);

    const newRecipeData: RecipeData[] = querySnapshot.docs.map((doc) => {
      const recipe: RecipeData = {
        id: doc.data().id,
        recipe_name: doc.data().recipe_name,
        keywords: doc.data().keywords,
        extension: doc.data().extension,
        categories: doc.data().categories,
        category_extension: doc.data().category_extension,
        rating: doc.data().rating,
        times_rated: doc.data().times_rated,
        comments: doc.data().comments,
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
    dispatch({ type: 'SET_RECIPE_DATA', payload: newRecipeData });
  };

  const fetchUser = async (user: User) => {
    const userRef = doc(db, 'users', user?.uid);
    const userDoc = (await getDoc(userRef)).data();
    return userDoc;
  };

  // const updateUserInDatabase = async (newUserData: user) => {
  //   const userRef = doc(db, 'users', newUserData.uid);
  //   await updateDoc(userRef, {
  //     uid: newUserData.uid,
  //     email: newUserData.email,
  //     bookmarks: newUserData.bookmarks,
  //     likes: newUserData.likes,
  //   });
  //   dispatch({ type: 'SET_USER_DATA', payload: newUserData });
  // };

  const updateRecipe = async (recipe: RecipeData) => {
    const recipeRef = doc(db, 'Recipes', recipe.recipe_name);
    await updateDoc(recipeRef, {
      ...recipe,
    });
    updateRecipeData(recipe);
  };

  // const deleteComment = async (recipe: RecipeData, comment_id: string) => {
  //   const recipeRef = doc(db, 'Recipes', recipe.recipe_name);
  //   await updateDoc(recipeRef, {
  //     comments: [
  //       ...recipe.comments,
  //       {}
  //     ]
  //   })
  // }

  // useEffect(() => {
  //   addPost();
  // }, []);

  useEffect(() => {
    fetchPosts();

    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const newUserData = (await fetchUser(user)) as user;
        updateUserData(newUserData);
        dispatch({ type: 'SET_FAVORITES', payload: newUserData.bookmarks });
        dispatch({ type: 'SET_IS_SIGNED_IN', payload: true });
        console.log('signed in: ' + newUserData?.email);
      } else {
        console.log('not signed in');
        updateUserData(null);
        dispatch({ type: 'SET_IS_SIGNED_IN', payload: false });
      }
      dispatch({ type: 'SET_IS_LOADING', payload: false });
    });
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   // console.log(userData);
  //   // console.log(favorites);
  //   // console.log(RecipeData);
  // }, [RecipeData]);
  return (
    <>
      {isLoading ? (
        <div className='loading'>
          <h1 data-text='Loading...'>Loading...</h1>
        </div>
      ) : (
        <>
          <BrowserRouter>
            <Navbar
              isSignedIn={isSignedIn}
              updateIsSignedIn={updateIsSignedIn}
              updateUserData={updateUserData}
              userData={userData}
            />
            <div className='wrapper'>
              <Routes>
                <Route
                  path='/recipe-website/'
                  element={
                    <Home featured={recipeData} allRecipes={recipeData} />
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
                      currentRecipes={currentRecipes}
                      recipes={recipeData}
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
                      currentRecipes={currentRecipes}
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
                      currentRecipes={currentRecipes}
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
                      currentRecipes={currentRecipes}
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
                      currentRecipes={currentRecipes}
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
                      currentRecipes={currentRecipes}
                      recipes={findFavorites}
                    />
                  }
                />

                <Route
                  path='/login'
                  element={
                    <Login
                      updateIsSignedIn={updateIsSignedIn}
                      updateUserData={updateUserData}
                    />
                  }
                />
                <Route
                  path='/signUp'
                  element={
                    <SignUp
                      updateIsSignedIn={updateIsSignedIn}
                      updateUserData={updateUserData}
                      updateFavorites={updateFavorites}
                    />
                  }
                />

                {[...recipeData].map((item) => {
                  return (
                    <Route
                      key={item.id}
                      path={item.extension}
                      element={
                        <Recipe
                          recipe={item}
                          userData={userData}
                          bookmarked={favorites}
                          isSignedIn={isSignedIn}
                          updateRecipe={updateRecipe}
                          addToFavorite={addToFavorites}
                          removeFromFavorite={removeFromFavorite}
                          updateUserData={updateUserInDatabase}
                        />
                      }
                    />
                  );
                })}

                <Route
                  path='/search'
                  element={<Search recipe={recipeData} />}
                />
              </Routes>
            </div>
            <GoToTop />
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
