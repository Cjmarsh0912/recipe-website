import { useState, useEffect, useMemo, useCallback } from 'react';
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
  deleteField,
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

import { RecipeData, user } from './interfaces/interface';

function App() {
  const [categories, setCategories] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [CurrentRecipes, setCurrentRecipes] = useState<RecipeData[]>([]);
  const [RecipeData, setRecipeData] = useState<RecipeData[]>([]);
  const [userData, setUserData] = useState((): user | null => null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function filterRecipesByCategory(category: string, recipes: RecipeData[]) {
    return [...recipes].filter((item) => item.categories.includes(category));
  }

  const SideRecipes = useMemo(
    () => filterRecipesByCategory('Sides', RecipeData),
    [RecipeData]
  );
  const LunchRecipes = useMemo(
    () => filterRecipesByCategory('Lunch', RecipeData),
    [RecipeData]
  );
  const DinnerRecipes = useMemo(
    () => filterRecipesByCategory('Dinner', RecipeData),
    [RecipeData]
  );
  const DessertRecipes = useMemo(
    () => filterRecipesByCategory('Dessert', RecipeData),
    [RecipeData]
  );

  const findFavorites: RecipeData[] = useMemo(
    () => [...RecipeData].filter((item) => favorites.includes(item.id)),
    [favorites]
  );

  const addToFavorites = (id: number) => {
    if (!favorites.includes(id)) {
      setFavorites((prevFavorites) => {
        const newFavorites = [...prevFavorites, id];
        if (isSignedIn && userData?.uid !== undefined) {
          const newUserData = { ...userData, bookmarks: newFavorites };
          setUserData(newUserData);
          updateUserInDatabase(newUserData);
        }
        alert('added to favorites');
        return newFavorites;
      });
    }
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

  function updateIsSignedIn() {
    setIsSignedIn(!isSignedIn);
  }

  const updateUserData = (user: user | null) =>
    setUserData(() => {
      if (user !== null) {
        setFavorites(user.bookmarks);
        return { ...user };
      } else {
        setFavorites([]);
        return null;
      }
    });

  const updateRecipeData = (recipe: RecipeData) => {
    const newRecipeData: RecipeData[] = RecipeData.map((item) => {
      if (item.id === recipe.id) return recipe;
      return item;
    });
    setRecipeData(newRecipeData);
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

    const newData: RecipeData[] = querySnapshot.docs.map((doc) => {
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
    setRecipeData(newData);
  };

  const fetchUser = async (user: User) => {
    const userRef = doc(db, 'users', user?.uid);
    const userDoc = (await getDoc(userRef)).data();
    return userDoc;
  };

  const updateUserInDatabase = async (user: user) => {
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      uid: user.uid,
      email: user.email,
      bookmarks: user.bookmarks,
    });
  };

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
        setIsSignedIn(true);
        console.log('signed in: ' + newUserData?.email);
      } else {
        console.log('not signed in');
        setUserData(null);
        setIsSignedIn(false);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // console.log(userData);
    // console.log(favorites);
    console.log(RecipeData);
  }, [RecipeData]);
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
                    <Home featured={RecipeData} allRecipes={RecipeData} />
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
                    />
                  }
                />

                {RecipeData.map((item) => {
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
                        />
                      }
                    />
                  );
                })}

                <Route
                  path='/search'
                  element={<Search recipe={RecipeData} />}
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
