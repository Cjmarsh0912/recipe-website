import Posts from '../../../components/posts/Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';
import Sort from '../../../components/sort/Sort';

interface Dessert_Recipes {
  dessertRecipes: RecipeData[];
}

export default function Dessert(props: Dessert_Recipes) {
  const categories = [
    {
      value: 'chocolate',
      category: 'Chocolate',
    },
    {
      value: 'cake',
      category: 'Cake',
    },
  ];
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Dessert Recipes</h3>
        <Sort category={categories} />
      </header>

      <Posts posts={props.dessertRecipes} />
    </main>
  );
}
