import Posts from '../../../components/posts/Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';
import Sort from '../../../components/sort/Sort';

interface Side_Recipes {
  sideRecipes: RecipeData[];
}

export default function Breakfast(props: Side_Recipes) {
  const categories = [
    {
      value: 'potato',
      category: 'Potato',
    },
  ];
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Side Recipes</h3>
        <Sort category={categories} />
      </header>

      <Posts posts={props.sideRecipes} />
    </main>
  );
}
