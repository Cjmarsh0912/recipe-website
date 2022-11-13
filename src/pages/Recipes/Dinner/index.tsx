import Posts from '../Posts';
import { RecipeData } from '../../../interfaces/interface';

import styles from '../recipes.module.css';

interface Dinner_Recipes {
  dinnerRecipes: RecipeData[];
}
export default function Dinner(props: Dinner_Recipes) {
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Dinner Recipes</h3>
        <div className={styles.search_bar_container}>
          <input
            id='search-bar'
            autoComplete='off'
            spellCheck='false'
            placeholder='Search'
          />
        </div>
      </header>

      <Posts posts={props.dinnerRecipes} />
    </main>
  );
}
