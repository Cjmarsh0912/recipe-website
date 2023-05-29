import { useEffect, useState, useMemo } from 'react';
import {
  useStateContext,
  useFunctionContext,
  useDispatchContext,
} from 'context/RecipeContext';

import Posts from 'components/posts/Posts';
import Sort from 'components/sort/Sort';

import { RecipeData } from 'interfaces/interface';

import styles from 'pages/Recipes/assets/css/recipes.module.css';

export default function Bookmarked() {
  const [category, setCategory] = useState<string>('choose category');
  const { favorites, recipeData } = useStateContext();
  const { dispatch } = useDispatchContext();
  const { sortArray, updateCategories } = useFunctionContext();

  const findFavorites: RecipeData[] = useMemo(
    () => [...recipeData].filter((item) => favorites.includes(item.id)),
    [favorites]
  );

  const updateCategory = (data: string) => {
    setCategory(data);
  };

  useEffect(() => {
    updateCategories(findFavorites);
    dispatch({ type: 'SET_CURRENT_RECIPES', payload: findFavorites });
  }, [findFavorites]);

  useEffect(() => {
    sortArray(category, findFavorites);
  }, [category]);

  return (
    <main>
      {favorites && favorites.length > 0 ? (
        <>
          <header className={styles.test_header}>
            <h3>Bookmarks</h3>
            <Sort updateCategory={updateCategory} />
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
