import { useEffect, useState, memo } from 'react';

import { useFunctionContext } from '../../Context/RecipeContext';

import Posts from '../../components/posts/Posts';

import { RecipeData } from '../../interfaces/interface';
import Sort from '../../components/sort/Sort';

import styles from './recipes.module.css';

type RecipesPageProps = {
  name: string;
  recipeData: RecipeData[];
};

const RecipesPage = memo(({ name, recipeData }: RecipesPageProps) => {
  const [category, setCategory] = useState<string>('choose category');
  const { updateCategories, updateCurrentRecipes, sortArray } =
    useFunctionContext();

  const updateCategory = (data: string) => {
    setCategory(data);
  };

  useEffect(() => {
    updateCategories(recipeData);
    updateCurrentRecipes(recipeData);
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
