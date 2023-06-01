import { useEffect, memo } from 'react';
import { useDispatchContext } from 'context/RecipePageContext';

import Posts from 'components/posts/Posts';
import Sort from 'components/sort/Sort';

import styles from './assets/css/recipes.module.css';

import { RecipeData } from 'interfaces/interface';

type RecipesPageProps = {
  name: string;
  recipeData: RecipeData[];
};

const RecipesPage = memo(({ name, recipeData }: RecipesPageProps) => {
  const { dispatch } = useDispatchContext();

  useEffect(() => {
    dispatch({ type: 'SET_PAGE_DATA', payload: recipeData });
  }, [recipeData]);
  return (
    <main>
      <header className={styles.test_header}>
        <h3>{name}</h3>
        <Sort />
      </header>

      <Posts />
    </main>
  );
});
export default RecipesPage;
