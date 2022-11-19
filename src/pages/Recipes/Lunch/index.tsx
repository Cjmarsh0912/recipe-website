import Posts from '../../../components/posts/Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';
import SearchBar from '../SearchBar';

interface Lunch_Recipes {
  lunchRecipes: RecipeData[];
}

export default function Lunch(props: Lunch_Recipes) {
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Lunch Recipes</h3>
        <SearchBar />
      </header>

      <Posts posts={props.lunchRecipes} />
    </main>
  );
}
