import { useState, useEffect } from 'react';

import {
  useStateContext,
  useFunctionContext,
  useDispatchContext,
} from 'context/RecipeContext';

import { useSearchContex } from 'context/SearchContext';

import Sort from 'components/sort/Sort';
import Posts from 'components/posts/Posts';

import styles from 'pages/Recipes/assets/css/recipes.module.css';

export default function SearchResults() {
  const [category, setCategory] = useState<string>('choose category');
  const { searchInput, searchRecipes } = useSearchContex();
  const { updateCategories, sortArray } = useFunctionContext();
  const { dispatch } = useDispatchContext();

  const updateCategory = (data: string) => {
    setCategory(data);
  };

  useEffect(() => {
    updateCategories(searchRecipes);
    dispatch({ type: 'SET_CURRENT_RECIPES', payload: searchRecipes });
  }, [searchRecipes]);

  useEffect(() => {
    sortArray(category, searchRecipes);
  }, [category]);
  return (
    <main>
      {searchRecipes.length > 0 ? (
        <>
          <header className={styles.test_header}>
            <h3>Search results for: {searchInput}</h3>
            <Sort updateCategory={updateCategory} />
          </header>

          <Posts />
        </>
      ) : (
        <h1>No results for {searchInput}</h1>
      )}
    </main>
  );
}
