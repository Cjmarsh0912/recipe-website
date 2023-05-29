import { useState, useEffect } from 'react';

import {
  useStateContext,
  useFunctionContext,
  useDispatchContext,
} from 'context/RecipeContext';

import { Link } from 'react-router-dom';

import Sort from 'components/sort/Sort';
import Posts from 'components/posts/Posts';

import styles from 'pages/Recipes/assets/css/recipes.module.css';

import { RecipeData } from 'interfaces/interface';

export default function Search() {
  const [category, setCategory] = useState<string>('choose category');
  const { searchInput, searchedRecipes } = useStateContext();
  const { updateCategories, sortArray } = useFunctionContext();
  const { dispatch } = useDispatchContext();

  const updateCategory = (data: string) => {
    setCategory(data);
  };

  useEffect(() => {
    updateCategories(searchedRecipes);
    dispatch({ type: 'SET_CURRENT_RECIPES', payload: searchedRecipes });
  }, [searchedRecipes]);

  useEffect(() => {
    sortArray(category, searchedRecipes);
  }, [category]);
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Results from search: {searchInput}</h3>
        <Sort updateCategory={updateCategory} />
      </header>

      <Posts />
    </main>
  );
}
