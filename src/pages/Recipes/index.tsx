import Posts from '../../components/posts/Posts';

import { RecipeData } from '../../interfaces/interface';
import Sort from '../../components/sort/Sort';

import styles from './recipes.module.css';

interface AllRecipes {
  recipes: RecipeData[];
}

export default function Recipes(props: AllRecipes) {
  const categories = [
    {
      value: 'lunch',
      category: 'Lunch',
    },
    {
      value: 'dinner',
      category: 'Dinner',
    },
    {
      value: 'sides',
      category: 'Sides',
    },
    {
      value: 'dessert',
      category: 'Dessert',
    },
    {
      value: 'noodles',
      category: 'Noodles',
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
        <h3>All recipes</h3>
        <Sort category={categories} />
      </header>

      <Posts posts={props.recipes} />
    </main>
  );
}
