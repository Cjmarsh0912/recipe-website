import { useEffect, useMemo } from 'react';
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

import 'animate.css';
import './assets/App.css';

import { RecipeData, user } from './interfaces/interface';

function App() {
  const { recipeData, isLoading } = useStateContext();
  const { dispatch } = useDispatchContext();
  const { updateUserData } = useFunctionContext();

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
            <Navbar />
            <div className='wrapper'>
              <Routes>
                <Route path='/recipe-website/' element={<Home />} />

                <Route
                  path='/all-recipes/'
                  element={
                    <RecipesPage name='All Recipes' recipeData={recipeData} />
                  }
                />

                <Route
                  path='/lunch-recipes/'
                  element={
                    <RecipesPage
                      name='Lunch Recipes'
                      recipeData={LunchRecipes}
                    />
                  }
                />

                <Route
                  path='/dinner-recipes/'
                  element={
                    <RecipesPage
                      name='Dinner Recipes'
                      recipeData={DinnerRecipes}
                    />
                  }
                />

                <Route
                  path='/side-recipes/'
                  element={
                    <RecipesPage name='Side Recipes' recipeData={SideRecipes} />
                  }
                />

                <Route
                  path='/dessert-recipes/'
                  element={
                    <RecipesPage
                      name='Dessert Recipes'
                      recipeData={DessertRecipes}
                    />
                  }
                />

                <Route path='/bookmarked' element={<Bookmarked />} />

                <Route path='/login' element={<Login />} />
                <Route path='/signUp' element={<SignUp />} />

                {[...recipeData].map((item) => {
                  return (
                    <Route
                      key={item.id}
                      path={item.extension}
                      element={<Recipe recipeData={item} />}
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
