import Posts from '../Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';
import SearchBar from '../SearchBar';

interface Dessert_Recipes {
  dessertRecipes: RecipeData[];
}

export default function Dessert(props: Dessert_Recipes) {
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Dessert Recipes</h3>
        <SearchBar />
      </header>

      <Posts posts={props.dessertRecipes} />
    </main>
  );
}
