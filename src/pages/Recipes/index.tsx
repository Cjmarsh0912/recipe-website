import { useEffect, useState, memo } from 'react';
import { useFunctionContext, useDispatchContext } from 'context/RecipeContext';

import Posts from 'components/posts/Posts';
import Sort from 'components/sort/Sort';

import styles from './assets/css/recipes.module.css';

import { RecipeData } from 'interfaces/interface';

type RecipesPageProps = {
  name: string;
  recipeData: RecipeData[];
};

const RecipesPage = memo(({ name, recipeData }: RecipesPageProps) => {
  const [category, setCategory] = useState<string>('choose category');
  const { dispatch } = useDispatchContext();
  const { updateCategories, sortArray } = useFunctionContext();

  const updateCategory = (data: string) => {
    setCategory(data);
  };

  useEffect(() => {
    updateCategories(recipeData);
    dispatch({ type: 'SET_CURRENT_RECIPES', payload: recipeData });
  }, [recipeData]);

  useEffect(() => {
    sortArray(category, recipeData);
  }, [category]);

  return (
    <main>
      <header className={styles.test_header}>
        <h3>{name}</h3>
        <Sort updateCategory={updateCategory} />
      </header>

      <Posts />
    </main>
  );
});
export default RecipesPage;
