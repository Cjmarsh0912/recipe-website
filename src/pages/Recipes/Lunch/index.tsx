import Posts from '../../../components/posts/Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';
import Sort from '../../../components/sort/Sort';

interface Lunch_Recipes {
  lunchRecipes: RecipeData[];
}

export default function Lunch(props: Lunch_Recipes) {
  const categories = [
    {
      value: 'noodles',
      category: 'Noodles',
    },
    {
      value: 'rice',
      category: 'Rice',
    },
    {
      value: 'potato',
      category: 'Potato',
    },
    {
      value: 'meat',
      category: 'Meat',
    },
    {
      value: 'no meat',
      category: 'No Meat',
    },
  ];
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Lunch Recipes</h3>
        <Sort category={categories} />
      </header>

      <Posts posts={props.lunchRecipes} />
    </main>
  );
}
