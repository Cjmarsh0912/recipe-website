import { useEffect, useMemo } from 'react';
import { useStateContext } from 'context/RecipeContext';

import { useDispatchContext } from 'context/RecipePageContext';

import Posts from 'components/posts/Posts';
import Sort from 'components/sort/Sort';

import { RecipeData } from 'interfaces/interface';

import styles from 'pages/Recipes/assets/css/recipes.module.css';

export default function Bookmarked() {
  const { favorites, recipeData } = useStateContext();
  const { dispatch } = useDispatchContext();

  const findFavorites: RecipeData[] = useMemo(
    () => [...recipeData].filter((item) => favorites.includes(item.id)),
    [favorites]
  );

  useEffect(() => {
    dispatch({ type: 'SET_PAGE_DATA', payload: findFavorites });
  }, [findFavorites]);

  return (
    <main>
      {favorites && favorites.length > 0 ? (
        <>
          <header className={styles.test_header}>
            <h3>Bookmarks</h3>
            <Sort />
          </header>
          <Posts />
        </>
      ) : (
        <p>
          Welcome to your bookmarked recipes page! You haven't bookmarked any
          recipes yet.
        </p>
      )}
    </main>
  );
}
