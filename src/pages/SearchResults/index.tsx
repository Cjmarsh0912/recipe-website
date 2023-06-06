import { useEffect } from 'react';

import { useDispatchContext } from 'context/RecipePageContext';

import { useSearchContext } from 'context/SearchContext';

import Sort from 'components/sort/Sort';
import Posts from 'components/posts/Posts';

import styles from './assets/css/search.module.css';

export default function SearchResults() {
  const { searchInput, searchRecipes } = useSearchContext();
  const { dispatch } = useDispatchContext();

  useEffect(() => {
    dispatch({ type: 'SET_PAGE_DATA', payload: searchRecipes });
  }, [searchRecipes]);
  return (
    <main>
      {searchRecipes.length > 0 ? (
        <>
          <header className={styles.test_header}>
            <h3>Search results for: {searchInput}</h3>
            <Sort />
          </header>

          <Posts />
        </>
      ) : (
        <header className={styles.test_header}>
          <h3>No results for: {searchInput}</h3>
        </header>
      )}
    </main>
  );
}
