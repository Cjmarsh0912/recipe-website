import Posts from '../../../components/posts/Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';
import SearchBar from '../SearchBar';

interface Side_Recipes {
  sideRecipes: RecipeData[];
}

export default function Breakfast(props: Side_Recipes) {
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Side Recipes</h3>
        <SearchBar />
      </header>

      <Posts posts={props.sideRecipes} />
    </main>
  );
}
