import Posts from '../../../components/posts/Posts';
import { RecipeData } from '../../../interfaces/interface';

import styles from '../recipes.module.css';
import Sort from '../../../components/sort/Sort';

interface Dinner_Recipes {
  dinnerRecipes: RecipeData[];
}
export default function Dinner(props: Dinner_Recipes) {
  const categories = [
    {
      value: 'chicken',
      category: 'Chicken',
    },
    {
      value: 'ground beef',
      category: 'Ground Beef',
    },
    {
      value: 'steak',
      category: 'Steak',
    },
    {
      value: 'noodles',
      category: 'Noodles',
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
        <h3>Dinner Recipes</h3>
        <Sort category={categories} />
      </header>

      <Posts posts={props.dinnerRecipes} />
    </main>
  );
}
