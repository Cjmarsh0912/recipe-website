import Posts from './Posts';

import { RecipeData } from '../../interfaces/interface';
import SearchBar from './SearchBar';

import styles from './recipes.module.css';

interface AllRecipes {
  recipes: RecipeData[];
}

export default function Recipes(props: AllRecipes) {
  return (
    <main>
      <header className={styles.test_header}>
        <h3>All recipes</h3>
        <SearchBar />
      </header>

      <Posts posts={props.recipes} />
    </main>
  );
}
