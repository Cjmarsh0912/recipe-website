import Posts from '../Posts';
import { RecipeData } from '../../../interfaces/interface';

import styles from '../recipes.module.css';
import SearchBar from '../SearchBar';

interface Dinner_Recipes {
  dinnerRecipes: RecipeData[];
}
export default function Dinner(props: Dinner_Recipes) {
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Dinner Recipes</h3>
        <SearchBar />
      </header>

      <Posts posts={props.dinnerRecipes} />
    </main>
  );
}
