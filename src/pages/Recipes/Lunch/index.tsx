import Posts from '../Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';

interface Lunch_Recipes {
  lunchRecipes: RecipeData[];
}

export default function Lunch(props: Lunch_Recipes) {
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Lunch Recipes</h3>
        <div className={styles.search_bar_container}>
          <input
            id='search-bar'
            autoComplete='off'
            spellCheck='false'
            placeholder='Search'
          />
        </div>
      </header>

      <Posts posts={props.lunchRecipes} />
    </main>
  );
}
